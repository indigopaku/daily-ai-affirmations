import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/api/affirmation", async (req, res) => {
  try {
    const today = new Date().toDateString();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You generate short, powerful daily affirmations."
        },
        {
          role: "user",
          content: `Generate a positive, short daily affirmation for ${today}.`
        }
      ],
      max_tokens: 40
    });

    const affirmation = completion.choices[0].message.content.trim();

    res.json({
      date: today,
      affirmation
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to generate affirmation."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
