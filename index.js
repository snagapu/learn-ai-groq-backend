import { Groq } from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/tutor", async (req, res) => {
  try {
    const messages = req.body.messages;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages must be an array." });
    }

    const response = await groq.chat.completions.create({
      messages,
      model: "mixtral-8x7b-32768", // use any model you want here
    });

const answer = response.choices?.[0]?.message?.content || "No answer received.";
    res.json({ answer });
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});
