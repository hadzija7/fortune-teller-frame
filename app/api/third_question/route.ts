import { getFrameMessage } from '@coinbase/onchainkit/frame';
import { FrameRequest } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { allowedOrigin } from '../../lib/origin';
import { getFortuneFrameHtml } from '../../lib/getFrameHtml';
import { kv } from "@vercel/kv";

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse('Not a POST method', { status: 401 });
  }
  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body);
  
  if (!isValid || !allowedOrigin(message)) {
    return new NextResponse('Unauthorized', { status: 402 });
  }
  
  const bid = message?.button as number;

  let character = ""
  if (bid == 1) {
    character = "Astronaut"
  } else if (bid == 2) {
    character = "Robot"
  } else if (bid == 3) {
    character = "Interstellar Trader"
  } else if (bid == 4) {
    character = "Bounty Hunter"
  }

  const fid = message?.interactor.fid || ""
  
  let jsonData: any = await kv.get<{ id: string; quantity: number }[]>(fid.toString());

  jsonData['character'] = character
  
  try {
    if(!fid){
      throw Error("Fid is undefined")
    }
    await kv.set(fid.toString(), JSON.stringify(jsonData));
  } catch (error) {
    console.log("Error while storing to kv")
  }

  return new NextResponse(
    getFortuneFrameHtml({
      image: `${NEXT_PUBLIC_URL}/tellFortune.png`,
    }),
  );
}
