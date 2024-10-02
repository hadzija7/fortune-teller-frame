// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "OAO/contracts/interfaces/IAIOracle.sol";
import "OAO/contracts/AIOracleCallbackReceiver.sol";
import "./AIGCNFT.sol";

/**
*       DISCLAIMER: THIS SMART CONTRACT IS FOR DEMONSTRATION PURPOSES ONLY!
*                   IT IS NOT AUDITED!
*                   DO NOT USE IT IN PRODUCTION!
*/

/// @notice Contract that requests nested inference from AI Oracle. 
/// @dev First inference is initiated through calculateAIResult method, the second one is requested from the callback.
contract FortuneTeller is AIOracleCallbackReceiver, AIGCNFT {

    event promptsUpdated(
        uint256 requestId,
        uint256 modelId,
        string input,
        string output,
        bytes callbackData
    );

    event promptRequest(
        uint256 requestId,
        uint256 nestedRequestId,
        address sender, 
        uint256 modelId,
        string prompt
    );

    struct AIOracleRequest {
        address sender;
        uint256 modelId;
        bytes input;
        bytes output;
    }

    address public owner;
    uint256 public llamaId;
    uint256 public sdId;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    /// @dev requestId => AIOracleRequest
    mapping(uint256 => AIOracleRequest) public requests;

    /// @dev modelId => callback gasLimit
    mapping(uint256 => uint64) public callbackGasLimit;

    /// @notice Initialize the contract, binding it to a specified AIOracle.
    constructor(IAIOracle _aiOracle) AIOracleCallbackReceiver(_aiOracle) {
        owner = msg.sender;
        llamaId = 11;
        sdId = 503;
        callbackGasLimit[llamaId] = 5_000_000;
        callbackGasLimit[sdId] = 500_000;
    }

    /// @notice sets the callback gas limit for a model
    /// @dev only only can set the gas limit
    function setCallbackGasLimit(uint256 modelId, uint64 gasLimit) external onlyOwner {
        callbackGasLimit[modelId] = gasLimit;
    }

    /// @dev uint256: modelID => (string: prompt => string: output)
    mapping(uint256 => mapping(string => string)) public prompts;

    /// @dev uint256 requestId => string output
    mapping(uint256 => string) public requestOutputs;

    /// @notice returns the output for the specified model and prompt
    function getAIResult(uint256 modelId, string calldata prompt) external view returns (string memory) {
        return prompts[modelId][prompt];
    }

    /// @notice OAO executes this method after it finishes with computation
    /// @param requestId id of the request  
    /// @param output result of the OAO computation
    /// @param callbackData Callback data is the modelId and the prompt for AI request.
    function aiOracleCallback(uint256 requestId, bytes calldata output, bytes calldata callbackData) external override onlyAIOracleCallback() {
        AIOracleRequest storage request = requests[requestId];
        require(request.sender != address(0), "request does not exist");
        request.output = output;
        prompts[request.modelId][string(request.input)] = string(output);

        //if callback length is 0, that means this is llama3 result (first inference request)
        //assign fortune to the aigcData
        if(callbackData.length == 0){
            aigcData[request.input].fortune = output;

            uint256 sdFee = estimateFee(sdId);

            (bool success, bytes memory data) = address(aiOracle).call{value: sdFee}(abi.encodeWithSignature("requestCallback(uint256,bytes,address,uint64,bytes)", sdId, output, address(this), callbackGasLimit[sdId], abi.encode(request.input)));
            require(success, "failed to call nested inference");

            (uint256 rid) = abi.decode(data, (uint256));
            AIOracleRequest storage recursiveRequest = requests[rid];
            recursiveRequest.input = output;
            recursiveRequest.sender = msg.sender;
            recursiveRequest.modelId = sdId;
            emit promptRequest(requestId, rid, msg.sender, sdId, "");

        }else{
            (bytes memory prompt) = abi.decode(callbackData, (bytes));
            aigcData[prompt].imageCID = output;
        }
        

        emit promptsUpdated(requestId, request.modelId, string(request.input), string(output), callbackData);
    }

    /// @notice estimating fee that is spent by OAO
    function estimateFee(uint256 modelId) public view returns (uint256) {
        return aiOracle.estimateFee(modelId, callbackGasLimit[modelId]);
    }

    /// @notice main point of interaction with OAO
    /// @dev modelId and prompt for second inference are passed as the callback data.
    function calculateAIResult(string calldata prompt) payable external returns (uint256) {
        bytes memory input = bytes(prompt);
        uint256 llamaFee = estimateFee(llamaId);
        uint256 sdFee = estimateFee(sdId);
        require(msg.value > llamaFee + sdFee, "FortuneTeller: Insufficient fee");

        uint256 requestId = aiOracle.requestCallback{value: llamaFee}(
            llamaId, input, address(this), callbackGasLimit[llamaId], ""
        );

        mint(prompt);

        AIOracleRequest storage request = requests[requestId];
        request.input = input;
        request.sender = msg.sender;
        request.modelId = llamaId;
        emit promptRequest(requestId, 0, msg.sender, llamaId, prompt);
        return requestId;
    }

    function withdrawExcessFunds(address payable recipient, uint256 amount) public onlyOwner {
        (bool succeed,) = recipient.call{value: amount}("");
        require(succeed, "Withdraw failed");
    }

}