import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import { FortuneCard } from './components/Card';

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
  const imageUrl = `https://ipfs.io/ipfs/QmWTY9kSTsyosFu1dnYpPWGsHdMWrUqnFbtfkUQ9j9kguN`

  return (
    <div style={{
      height: '100%',
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        width: '1200px',
        height: '1200px',
      }}>
        <FortuneCard 
          message='word1 word2 word3, word1 word2 word3, word1 word2 word3, word1 word2 word3, word1 word2 word3, word1 word2 word3, word1 word2 word3, word1 word2 word3, word1 word2 word3, word1 word2 word3, '
          image={imageUrl}
        />
      </div>
    </div>
  );
}
