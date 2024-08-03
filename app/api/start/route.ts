import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { allowedOrigin } from '../../lib/origin';
import { getInstructionsHtml } from '../../lib/getFrameHtml';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);

  if (isValid && allowedOrigin(message)) {
    return new NextResponse(
      getInstructionsHtml({
        image: `${NEXT_PUBLIC_URL}/instructions.png`,
      }),
    );
  } else return new NextResponse('Unauthorized', { status: 402 });
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';