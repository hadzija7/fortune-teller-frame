// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/// @notice User interfacing contract that interacts with OAO
/// @dev Prompt contract inherits AIOracleCallbackReceiver, so that OPML nodes can callback with the result.
contract AIGCNFT is ERC721 {
    struct TokenMetadata {
        string image;
        string prompt;
    }

    // tokenId(requestId) => metamdata
    mapping(uint256 => TokenMetadata) public metadataStorage;

    constructor() ERC721("On-chain AI Oracle", "OAO") {}

    function mint(uint256 requestId, string calldata image, string calldata prompt) external {
        metadataStorage[requestId].image = image;
        metadataStorage[requestId].prompt = prompt;
        _safeMint(msg.sender, requestId);
    }

    function tokenURI(uint256 requestId) public view override returns (string memory) {
        _requireOwned(requestId);

        string memory cid = metadataStorage[requestId].image;

        string memory baseURI = "https://ipfs.io/ipfs/";
        return bytes(baseURI).length > 0 ? string.concat(baseURI, cid) : "";
    }
}