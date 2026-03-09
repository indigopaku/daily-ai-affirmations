// server.js or api/affirmation.js (Node.js)
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  try {
    const today = new Date().toDateString();
    const prompt = `Generate a positive daily affirmation for ${today}, 1-2 sentences, uplifting and motivational.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 50,
    });

    const affirmation = completion.choices[0].message.content.trim();

    res.status(200).json({ affirmation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate affirmation" });
  }
}
