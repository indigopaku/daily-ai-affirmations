// api/affirmation.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Simple in-memory cache
let cachedAffirmation = null;
let cacheDate = null;

export default async function handler(req, res) {
  res.status(200).json({ affirmation: "Test affirmation: Everything works!" });
}
}

