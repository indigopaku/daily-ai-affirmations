// today.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  try {
    const today = new Date().toDateString(); // ensures unique prompt per day

    // AI prompt — generates a daily affirmation
    const prompt = `Create a positive daily affirmation for ${today}. Keep it 1-2 uplifting sentences.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 50,
    });

    const affirmation = completion.choices[0].message.content.trim();

    res.status(200).json({ affirmation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate affirmation" });
  }
}
