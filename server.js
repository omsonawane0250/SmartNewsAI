const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/summarize", async (req, res) => {

  let text = req.body.text;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Summarize this news in 2 simple lines: ${text}`
          }
        ]
      })
    });

    const data = await response.json();

    console.log(data); // DEBUG

    if (data.error) {
      return res.json({ summary: "❌ " + data.error.message });
    }

    let summary = data.choices[0].message.content;

    res.json({ summary });

  } catch (error) {
    res.json({ summary: "❌ Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
