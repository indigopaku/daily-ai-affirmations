// today.js - Node.js Express example
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/today", (req, res) => {
  const today = new Date().toDateString();

  // Hardcoded affirmation for testing
  const affirmation = "You are resilient, capable, and loved 💖";

  res.json({ date: today, affirmation });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

