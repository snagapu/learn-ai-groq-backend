import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Groq } from "groq-sdk";

// Load .env variables (for local dev)
dotenv.config();

// Initialize Express and Groq
const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Middleware
app.use(cors());
app.use(express.json());

// Route: POST /api/tutor
app.post("/api/tutor", async (req, res) => {
  try {
    const messages = req.body.messages;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages must be an array." });
    }

    const response = await groq.chat.completions.create({
      messages,
      model: "llama3-70b-8192", // ✅ Supported Groq model
    });

    const answer = response.choices?.[0]?.message?.content || "No answer received.";
    res.json({ answer });
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
