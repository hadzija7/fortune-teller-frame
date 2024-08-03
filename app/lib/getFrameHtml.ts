import { FrameMetadataType, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NEXT_PUBLIC_URL } from '../config';

export function getInstructionsHtml(frameMetadata: FrameMetadataType){
    const html = getFrameHtmlResponse(frameMetadata);

    const extraTags = [
        '<meta property="fc:frame" content="vNext" />',
        '<meta name="fc:frame:image" content="https://oao-frame.vercel.app/api/images/start" />',
        '<meta property="fc:frame:button:1" content="Next" />',
        '<meta property="fc:frame:button:1:action" />',
        `<meta property="fc:frame:button:1:target" content="${NEXT_PUBLIC_URL}/api/instructions" />`,
        '<meta property="fc:frame:image:aspect_ratio" content="1:1" />',
    ];

    return `${html.slice(0, html.length - 14)}${extraTags.join('')}</head></html>`;
}
  