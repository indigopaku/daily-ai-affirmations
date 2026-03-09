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
async function getAffirmation() {
  try {
    const category = document.getElementById('category').value;

    // Include the category in the query string
    const res = await fetch(`https://daily-ai-affirmations-wqp5-c0oo4ir5q-indigopakus-projects.vercel.app/api/today?category=${category}`);
    const data = await res.json();

    // Format full date
    const fullDate = new Date(data.date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').innerText = fullDate.toLocaleDateString(undefined, options);

    const div = document.getElementById('affirmation');
    div.style.opacity = 0;
    setTimeout(() => {
      div.innerText = data.affirmation;
      div.style.opacity = 1;
    }, 300);

  } catch(err) {
    document.getElementById('affirmation').innerText = "You are resilient, loved, and capable of growth 💖";
    document.getElementById('date').innerText = new Date().toLocaleDateString(undefined, { weekday: 'long', year:'numeric', month:'long', day:'numeric' });
  }
}


