import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';
import { FortuneCard } from '../../../components/Card';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const fortune = searchParams.get('f') ?? '';
  const image = searchParams.get('i') ?? '';

  const decodedString = decodeURIComponent(fortune);
  const imageCID = decodeURIComponent(image);

  console.log("Decoded string: ", decodedString)
  console.log("Decoded image: ", imageCID)

  // const imageUrl = `https://ipfs.io/ipfs/${imageCID}`

  return new ImageResponse(<FortuneCard message={`${decodedString}`} image={imageCID}/>, {
    width: 1200,
    height: 1200
  });
}
