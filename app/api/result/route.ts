import { NextRequest, NextResponse } from 'next/server';
import { FORTUNE_TELLER_ADDRESS, FORTUNE_TELLER_ABI, NEXT_PUBLIC_URL, RPC_URL } from '../../config';
import { getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { getResultPendingFrameHtml } from '../../lib/getFrameHtml';
import {Web3} from 'web3';

const web3 = new Web3(RPC_URL);

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const url = await req.url;
  const idstring = url.split('=')[1];
  const txhash = idstring as string;

  try {
    const receipt = await web3.eth.getTransactionReceipt(txhash);

    const data = receipt.logs[1].data ? receipt.logs[1].data : '0x'
    const event_abi = [
      {
        "name": "requestId",
        "type": "uint256"
      },
      {
        "name": "sender",
        "type": "address"
      },
      {
        "name": "modelId",
        "type": "uint256"
      },
      {
        "name": "prompt",
        "type": "string"
      }
    ];

    const decodedData = web3.eth.abi.decodeParameters(event_abi, data.toString());
    const llamaPrompt = decodedData.prompt
    const requestId = Number(decodedData.requestId)

    //reading result from the contract
    const contract: any = new web3.eth.Contract(FORTUNE_TELLER_ABI, FORTUNE_TELLER_ADDRESS);
    const llamaResult = await contract.methods.prompts(11, llamaPrompt).call()
    console.log("Llama result: ", llamaResult);

    const diffusionResult = await contract.methods.prompts(503, llamaResult).call()
    console.log("Diffusion result: ", diffusionResult)

    if (!llamaResult || !diffusionResult) {
      const ret = getResultPendingFrameHtml(txhash)
      return new NextResponse(ret)
    }

    const html = getFrameHtmlResponse({
      image: `${NEXT_PUBLIC_URL}/api/images/fortune?f=${encodeURIComponent(llamaResult)}&i=${encodeURIComponent(diffusionResult)}`,
    });
  
    const extraTags = [
      '<meta property="og:title" content="FortuneTeller frame">',
      '<meta property="og:description" content="Farcaster Protocol OAO">',
      '<meta property="fc:frame:image:aspect_ratio" content="1:1" />',
      '<meta property="fc:frame:button:1" content="Mint NFT" />',
      '<meta property="fc:frame:button:1:action" content="tx" />',
      `<meta property="fc:frame:button:1:target" content="${NEXT_PUBLIC_URL}/api/mint?requestId=${encodeURIComponent(requestId)}&fortune=${encodeURIComponent(llamaResult)}&image=${encodeURIComponent(diffusionResult)}"/>`,
      `<meta property="fc:frame:button:1:post_url" content="${NEXT_PUBLIC_URL}/api/last_frame" />`,
    ];
    
    const ret = `${html.slice(0, html.length - 14)}${extraTags.join('')}</head></html>`;
  
    return new NextResponse(ret);

  } catch (error) {
    console.error('Error fetching transaction receipt:', error);

    const ret = getResultPendingFrameHtml(txhash);
  
    return new NextResponse(ret);

  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
