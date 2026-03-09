import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const affirmationsCache = {};

export default async function handler(req, res) {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  if (affirmationsCache[today]) {
    return res.status(200).json({ affirmation: affirmationsCache[today] });
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: "Write a short, uplifting daily affirmation." }],
  });

  const affirmation = response.choices[0].message.content.trim();
  affirmationsCache[today] = affirmation;

  res.status(200).json({ affirmation });
}
