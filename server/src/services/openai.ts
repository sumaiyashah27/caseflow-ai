import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
let client: OpenAI | null = null;
if (apiKey) {
  client = new OpenAI({ apiKey });
}

export async function analyzeText(content: string) {
  if (!client) {
    // Safe mock if no API key is provided
    return {
      summary: content.slice(0, 160) + (content.length > 160 ? '...' : ''),
      entities: ['Client', 'Date', 'Amount'],
      classification: content.toLowerCase().includes('agreement') ? 'contract' :
                      content.toLowerCase().includes('motion') ? 'motion' : 'memo',
      risk: 'low'
    };
  }
  const sys = "You are a legal document analysis assistant. Extract entities, summarize, classify (contract, motion, judgment, memo), and estimate risk low/medium/high.";
  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: sys },
      { role: "user", content: `Analyze this document:
${content}` }
    ],
    temperature: 0.2
  });
  const text = resp.choices[0]?.message?.content || "";
  // Very light structuring (kept simple for demo)
  return {
    summary: text.slice(0, 400),
    entities: [],
    classification: text.toLowerCase().includes('contract') ? 'contract' :
                   text.toLowerCase().includes('motion') ? 'motion' : 'memo',
    risk: 'medium'
  };
}
