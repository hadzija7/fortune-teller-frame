import { FrameMetadataType, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { CHAIN_ID, EXPLORERS, NEXT_PUBLIC_URL } from '../config';

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
      '<meta property="fc:frame:button:1" content="Astronaut" />',
      `<meta property="fc:frame:button:1:target" content="${NEXT_PUBLIC_URL}/api/third_question" />`,
      '<meta property="fc:frame:button:2" content="Robot" />',
      `<meta property="fc:frame:button:2:target" content="${NEXT_PUBLIC_URL}/api/third_question" />`,
      '<meta property="fc:frame:button:3" content="Interstellar Trader" />',
      `<meta property="fc:frame:button:3:target" content="${NEXT_PUBLIC_URL}/api/third_question" />`,
      '<meta property="fc:frame:button:4" content="Bounty Hunter" />',
      `<meta property="fc:frame:button:4:target" content="${NEXT_PUBLIC_URL}/api/third_question" />`,
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

export function getResultPendingFrameHtml(txhash: string){
  const html = getFrameHtmlResponse({
    image: `${NEXT_PUBLIC_URL}/generating.png`,
  });

  const extraTags = [
    '<meta property="og:title" content="OAO: Farcaster">',
    '<meta property="og:description" content="Farcaster Protocol OAO">',
    '<meta property="og:image" content="https://oao-frame.vercel.app/api/images/start">',
    '<meta property="fc:frame:image:aspect_ratio" content="1:1" />',
    '<meta property="fc:frame:button:1" content="View on Etherscan" />',
    '<meta property="fc:frame:button:1:action" content="link" />',
    `<meta property="fc:frame:button:1:target" content="${EXPLORERS[CHAIN_ID]}/tx/${txhash}"/>`,
    '<meta property="fc:frame:button:2" content="Refresh" />',
    '<meta property="fc:frame:button:2:action" />',
    `<meta property="fc:frame:button:2:target" content="${NEXT_PUBLIC_URL}/api/result?id=${txhash}"/>`,
  ];
  // hack: remove close tags, add aspect ratio and required OG tags
  const ret = `${html.slice(0, html.length - 14)}${extraTags.join('')}</head></html>`;

  return ret
}