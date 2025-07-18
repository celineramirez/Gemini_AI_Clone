// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from '@google/genai';

const api_key = import.meta.env.VITE_GEMINI_API_KEY

async function runChat(prompt) {
  const ai = new GoogleGenAI({
    apiKey: api_key,
  });
  const tools = [
    {
      googleSearch: {
      }
    },
  ];
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
    responseMimeType: 'text/plain',
  };
  const modelName = 'gemini-2.5-pro';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model: modelName,
    config,
    contents,
  });
  let outputText = '';

  for await (const chunk of response) {
    console.log(chunk.text);
    outputText += chunk.text;
  }

  return outputText;
}

export default runChat;
