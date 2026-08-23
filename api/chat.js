const SYSTEM_PROMPT = `You are a focused placement-preparation assistant embedded in a student's Notion command center.

Primary areas:
- DSA and competitive programming
- Aptitude and OA preparation
- Core CS: OS, DBMS, CN, OOP
- System design fundamentals
- Resume and project positioning
- Internship and placement preparation
- Interview preparation

Style:
- Be concise, technical, structured, and practical.
- Prefer step-by-step explanations when teaching.
- For DSA, explain the approach before code and discuss time/space complexity.
- For interview questions, emphasize what an interviewer expects.
- Do not fabricate current opportunities, compensation, deadlines, or company-specific hiring facts. State when fresh verification is needed.
- Keep responses useful inside a compact embedded chat UI.`;

function extractOutputText(data) {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const parts = [];
  for (const item of data?.output || []) {
    if (item?.type !== 'message') continue;
    for (const content of item?.content || []) {
      if (content?.type === 'output_text' && content?.text) parts.push(content.text);
    }
  }
  return parts.join('\n').trim();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'OPENAI_API_KEY is not configured on the deployment.',
    });
  }

  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages must be a non-empty array' });
    }

    const sanitized = messages
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-16)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 12000) }));

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.6',
        instructions: SYSTEM_PROMPT,
        input: sanitized,
        max_output_tokens: 1400,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      return res.status(response.status).json({
        error: data?.error?.message || 'OpenAI API request failed',
      });
    }

    const text = extractOutputText(data);
    if (!text) {
      return res.status(502).json({ error: 'The model returned an empty response.' });
    }

    return res.status(200).json({ text });
  } catch (error) {
    console.error('Placement assistant error:', error);
    return res.status(500).json({ error: 'Unable to generate a response right now.' });
  }
}
