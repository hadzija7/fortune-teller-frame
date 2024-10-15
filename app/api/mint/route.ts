import { getFrameMessage } from '@coinbase/onchainkit/frame';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { CHAIN_ID, FORTUNE_TELLER_ABI, FORTUNE_TELLER_ADDRESS, RPC_URL } from '../../config';
import {Web3} from 'web3';
import { allowedOrigin } from '../../lib/origin';


const web3 = new Web3(RPC_URL);

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse('Not a POST method', { status: 401 });
  }
  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body);

  if (!isValid || !allowedOrigin(message)) {
    return new NextResponse('Unauthorized', { status: 402 });
  }

  //get mint data from url
  const searchParams = req.nextUrl.searchParams;
  const requestId = searchParams.get('requestId') ?? '';
  const fortune = searchParams.get('fortune') ?? '';
  const image = searchParams.get('image') ?? '';

  console.log("RequestId: ", requestId)
  console.log("Fortune: ", fortune)
  console.log("Image: ", image)

  const contract = new web3.eth.Contract(FORTUNE_TELLER_ABI, FORTUNE_TELLER_ADDRESS);

  // return NextResponse.json({
  //   chainId: `eip155:${CHAIN_ID}`,
  //   method: 'eth_sendTransaction',
  //   params: {
  //     abi: AIGCNFT_ABI,
  //     to: AIGCNFT_ADDRESS,
  //     data
  //   },
  // });

}