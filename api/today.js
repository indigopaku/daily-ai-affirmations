// server.js
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/api/affirmation", async (req, res) => {
  try {
    const today = new Date().toDateString();

    // Prompt to generate a short, uplifting daily affirmation
    const prompt = `Generate a positive, short daily affirmation for today, ${today}.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const affirmation = completion.choices[0].message.content.trim();

    res.json({ date: today, affirmation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate affirmation." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
