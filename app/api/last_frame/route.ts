import { NextRequest, NextResponse } from 'next/server';
import { CHAIN_ID, EXPLORERS, NEXT_PUBLIC_URL } from '../../config';
import { getFrameHtml } from '../../lib/getFrameHtml';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const txhash = body.untrustedData.transactionId;

  return new NextResponse(
    getFrameHtml({
      buttons: [
        {
          label: 'View on Etherscan',
          action: 'link',
          target: `${EXPLORERS[CHAIN_ID]}/tx/${txhash}`, 
        },
        {
          label: 'Play Again',
        },
      ],
      image: `${NEXT_PUBLIC_URL}/lastFrame.png`,
      post_url: `${NEXT_PUBLIC_URL}/api/start`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
