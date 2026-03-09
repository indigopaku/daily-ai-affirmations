// today.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  try {
    const today = new Date().toDateString();

    // Prompt for deep daily affirmation
    const prompt = `
Generate a deep, uplifting daily affirmation for today, ${today}.
Make it reflective, encouraging, and meaningful.
Keep it short but profound.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const affirmation = completion.choices[0].message.content.trim();

    res.status(200).json({ date: today, affirmation });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      date: new Date().toDateString(),
      affirmation: "You are resilient, capable, and loved 💖",
    });
  }
}
