import { getFrameMessage } from '@coinbase/onchainkit/frame';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { CHAIN_ID, FORTUNE_TELLER_ABI, FORTUNE_TELLER_ADDRESS, RPC_URL } from '../../config';
import {Web3} from 'web3';
import { allowedOrigin } from '../../lib/origin';
import { kv } from "@vercel/kv";

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

  //read the data from the database, generate prompt for the OAO call
  const fid = message?.interactor.fid || ""
  let jsonData: any = await kv.get<{ id: string; quantity: number }[]>(fid.toString());

  console.log("Json data: ", JSON.stringify(jsonData))

  const contract = new web3.eth.Contract(FORTUNE_TELLER_ABI, FORTUNE_TELLER_ADDRESS);
  const prompt = `Tell the blockchain (crypto) fortune for user based on the following parameters: ${JSON.stringify(jsonData)}. Answer should be up to 25 words!`

  const fee11 = Number(await contract.methods.estimateFee(11).call());
  const fee503 = Number(await contract.methods.estimateFee(503).call())
  console.log("fee11: ", fee11.toString())
  console.log("fee503: ", fee503.toString())
  const totalFee = ((fee11 + fee503)*11/10)
  
  const data = contract.methods.calculateAIResult(prompt).encodeABI();

  // Return transaction details response to farcaster
  return NextResponse.json({
    chainId: `eip155:${CHAIN_ID}`,
    method: 'eth_sendTransaction',
    params: {
      abi: FORTUNE_TELLER_ABI,
      to: FORTUNE_TELLER_ADDRESS,
      data,
      value: totalFee.toString(),
    },
  });
}