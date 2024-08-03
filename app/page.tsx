import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

export async function generateMetadata(): Promise<Metadata> {
  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: 'Enter, Degen 🔮',
      },
    ],
    image: `${NEXT_PUBLIC_URL}/LandingPage.png`,
    post_url: `${NEXT_PUBLIC_URL}/api/start`,
  });

  return {
    title: 'FortuneTeller',
    description: 'Create an AI NFT through OAO.',
    openGraph: {
      title: 'FortuneTeller',
      description: 'Create an AI NFT through OAO.',
      images: [`${NEXT_PUBLIC_URL}/LandingPage.png`],
    },
    other: {
      ...frameMetadata,
      'fc:frame:image:aspect_ratio': '1:1',
    },
  };
}

export default function Home() {
  return (
    <div></div>
  );
}
