// server.js
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/api/today", async (req, res) => {
  try {
    const today = new Date().toDateString();
    const category = req.query.category || "general"; // default if none chosen

    // Create a deep affirmation based on category
    const prompt = `Generate a deep, uplifting daily affirmation for today, ${today}.
Category: ${category}. Make it reflective, encouraging, and meaningful.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const affirmation = completion.choices[0].message.content.trim();

    res.json({ date: today, affirmation });

  } catch (error) {
    console.error(error);
    res.status(500).json({ date: today, affirmation: "You are amazing and capable 💖" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

