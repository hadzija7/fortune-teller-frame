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

    const tokenId = Number(receipt.logs[1].topics?.[3])

    const contract: any = new web3.eth.Contract(FORTUNE_TELLER_ABI, FORTUNE_TELLER_ADDRESS);
    const tokenUri: string = await contract.methods.tokenURI(tokenId).call();
    console.log("TokenURI: ", tokenUri)

    const rawBase64 = tokenUri.substring(29)
    console.log("Raw Base64: ", rawBase64)

    const decodedTokenURI: any = atob(rawBase64);
    console.log("Decoded Token URI: ", decodedTokenURI)

    const json = JSON.parse(decodedTokenURI)
    console.log("JSON: ", json)

    const image: string = json.image

    if(tokenUri == "" || image == "ipfs://"){
      const ret = getResultPendingFrameHtml(txhash)
      return new NextResponse(ret)
    }

    const cid = image.substring(7)
    console.log("CID: ", cid)

    const html = getFrameHtmlResponse({
      image: `${NEXT_PUBLIC_URL}/api/images/fortune?f=${encodeURIComponent("")}&i=${encodeURIComponent(cid)}`,
    });
  
    const extraTags = [
      '<meta property="og:title" content="FortuneTeller frame">',
      '<meta property="og:description" content="Farcaster Protocol OAO">',
      '<meta property="fc:frame:image:aspect_ratio" content="1:1" />',
      '<meta property="fc:frame:button:1" content="Play Again" />',
      `<meta property="fc:frame:button:1:target" content="${NEXT_PUBLIC_URL}/api/start"/>`
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
