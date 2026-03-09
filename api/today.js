// api/affirmation.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Simple in-memory cache
let cachedAffirmation = null;
let cacheDate = null;

export default async function handler(req, res) {
  try {
    const today = new Date().toDateString();

    // Return cached affirmation if it exists for today
    if (cachedAffirmation && cacheDate === today) {
      return res.status(200).json({ affirmation: cachedAffirmation });
    }

    const prompt = `Generate a positive daily affirmation for ${today}, 1-2 sentences, uplifting and motivational.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 50,
    });

    const affirmation = completion.choices[0].message.content.trim();

    // Save to cache
    cachedAffirmation = affirmation;
    cacheDate = today;

    res.status(200).json({ affirmation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate affirmation" });
  }
}
