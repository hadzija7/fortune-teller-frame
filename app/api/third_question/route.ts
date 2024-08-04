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
  
  let zodiac: string = message?.raw.action.input.text

  const fid = message?.interactor.fid || ""
  
  let jsonData: any = await kv.get<{ id: string; quantity: number }[]>(fid.toString());

  jsonData['zodiac'] = zodiac
  
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
