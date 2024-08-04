import { getFrameMessage } from '@coinbase/onchainkit/frame';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL} from '../../config';
import { getSecondQuestionHtml } from '../../lib/getFrameHtml';
import { allowedOrigin } from '../../lib/origin';
import { kv } from "@vercel/kv";


export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse('Not a POST request', { status: 401 });
  }
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);

  if (!isValid || !allowedOrigin(message)) {
    return new NextResponse('Unauthorized', { status: 402 });
  }

  const bid = message?.button as number;

  let chain = "";
  if (bid == 1) {
    chain = "Ethereum"
  } else if (bid == 2) {
    chain = "Base"
  } else if (bid == 3) {
    chain = "Optimism"
  } else if (bid == 4) {
    chain = "Mantle"
  }

  const jsonData = {
    chain: chain
  }

  const fid = message?.interactor.fid || ""
  try {
    if(!fid){
      throw Error("Fid is undefined")
    }
    await kv.set(fid.toString(), JSON.stringify(jsonData));
  } catch (error) {
    console.log("Error while storing to kv")
  }

  return new NextResponse(
    getSecondQuestionHtml({
      image: `${NEXT_PUBLIC_URL}/second_question.png`,
    }),
  );

}
