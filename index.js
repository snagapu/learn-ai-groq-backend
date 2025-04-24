
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/tutor", async (req, res) => {
  const { question } = req.body;

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are an expert tutor who explains things clearly and simply." },
          { role: "user", content: question }
        ],
      }),
    });

    const data = await groqRes.json();
    const answer = data.choices?.[0]?.message?.content || "Sorry, no answer received.";
    res.json({ answer });
  } catch (err) {
    console.error("Groq error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
