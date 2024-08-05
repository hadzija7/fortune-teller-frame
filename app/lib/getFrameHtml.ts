import { FrameMetadataType, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NEXT_PUBLIC_URL } from '../config';

export function getFrameHtml(frameMetadata: FrameMetadataType) {
  const html = getFrameHtmlResponse(frameMetadata);

  const extraTags = [
    '<meta property="og:title" content="OAO: Farcaster">',
    '<meta property="og:description" content="Farcaster Protocol OAO">',
    '<meta property="fc:frame:image:aspect_ratio" content="1:1" />',
  ];
  
  return `${html.slice(0, html.length - 14)}${extraTags.join('')}</head></html>`;
}

export function getInstructionsHtml(frameMetadata: FrameMetadataType){
    const html = getFrameHtmlResponse(frameMetadata);

    const extraTags = [
        '<meta property="fc:frame" content="vNext" />',
        '<meta property="fc:frame:button:1" content="Next" />',
        '<meta property="fc:frame:button:1:action" />',
        `<meta property="fc:frame:button:1:target" content="${NEXT_PUBLIC_URL}/api/instructions" />`,
        '<meta property="fc:frame:image:aspect_ratio" content="1:1" />',
    ];

    return `${html.slice(0, html.length - 14)}${extraTags.join('')}</head></html>`;
}

export function getFirstQuestionHtml(frameMetadata: FrameMetadataType){
    const html = getFrameHtmlResponse(frameMetadata);
  
    const extraTags = [
      '<meta property="fc:frame" content="vNext" />',
      '<meta property="fc:frame:image:aspect_ratio" content="1:1" />',
      '<meta property="fc:frame:button:1" content="Ethereum" />',
      `<meta property="fc:frame:button:1:target" content="${NEXT_PUBLIC_URL}/api/first_question" />`,
      '<meta property="fc:frame:button:2" content="Base" />',
      `<meta property="fc:frame:button:2:target" content="${NEXT_PUBLIC_URL}/api/first_question" />`,
      '<meta property="fc:frame:button:3" content="Optimism" />',
      `<meta property="fc:frame:button:3:target" content="${NEXT_PUBLIC_URL}/api/first_question" />`,
      '<meta property="fc:frame:button:4" content="Mantle" />',
      `<meta property="fc:frame:button:4:target" content="${NEXT_PUBLIC_URL}/api/first_question" />`,
    ];
  
    return `${html.slice(0, html.length - 14)}${extraTags.join('')}</head></html>`;
}

export function getSecondQuestionHtml(frameMetadata: FrameMetadataType){
    const html = getFrameHtmlResponse(frameMetadata);
  
    const extraTags = [
      '<meta property="fc:frame" content="vNext" />',
      '<meta property="fc:frame:image:aspect_ratio" content="1:1" />',
      '<meta property="fc:frame:button:1" content="Normie" />',
      `<meta property="fc:frame:button:1:target" content="${NEXT_PUBLIC_URL}/api/second_question" />`,
      '<meta property="fc:frame:button:2" content="Degen" />',
      `<meta property="fc:frame:button:2:target" content="${NEXT_PUBLIC_URL}/api/second_question" />`,
      '<meta property="fc:frame:button:3" content="Very Degen" />',
      `<meta property="fc:frame:button:3:target" content="${NEXT_PUBLIC_URL}/api/second_question" />`,
      '<meta property="fc:frame:button:4" content="Living Pepe" />',
      `<meta property="fc:frame:button:4:target" content="${NEXT_PUBLIC_URL}/api/second_question" />`,
    ];
  
    return `${html.slice(0, html.length - 14)}${extraTags.join('')}</head></html>`;
}

export function getThirdQuestionHtml(frameMetadata: FrameMetadataType){
    const html = getFrameHtmlResponse(frameMetadata);
  
    const extraTags = [
      '<meta property="fc:frame" content="vNext" />',
      '<meta property="fc:frame:image:aspect_ratio" content="1:1" />',
      `<meta property="fc:frame:input:text" content="eg. Aries, Taurus, Gemini" />`,
      '<meta property="fc:frame:button:1" content="Answer" />',
      `<meta property="fc:frame:button:1:target" content="${NEXT_PUBLIC_URL}/api/third_question" />`,
    ];
  
    return `${html.slice(0, html.length - 14)}${extraTags.join('')}</head></html>`;
}

export function getFortuneFrameHtml(frameMetadata: FrameMetadataType) {
    const html = getFrameHtmlResponse(frameMetadata);
  
    const extraTags = [
      '<meta property="fc:frame" content="vNext" />',
      '<meta property="fc:frame:image:aspect_ratio" content="1:1" />',
      '<meta property="fc:frame:button:1" content="Tell the fortune" />',
      '<meta property="fc:frame:button:1:action" content="tx" />',
      `<meta property="fc:frame:button:1:target" content="${NEXT_PUBLIC_URL}/api/tell_fortune" />`,
      `<meta property="fc:frame:button:1:post_url" content="${NEXT_PUBLIC_URL}/api/confirm" />`,
    ];
    
    return `${html.slice(0, html.length - 14)}${extraTags.join('')}</head></html>`;
  }