import OpenAI from "openai";

// Initialize OpenAI with API key from Vercel environment
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Cache today's affirmation so all users see the same one
const affirmationsCache = {};

export default async function handler(req, res) {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  if (affirmationsCache[today]) {
    return res.status(200).json({ affirmation: affirmationsCache[today] });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "user", content: "Write a short, uplifting daily affirmation." }
      ],
    });

    const affirmation = response.choices[0].message.content.trim();
    affirmationsCache[today] = affirmation;

    res.status(200).json({ affirmation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ affirmation: "You are amazing and loved 💖" });
  }
}
