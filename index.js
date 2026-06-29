const express = require('express');
const axios = require('axios');
const app = express();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://ai-service:8000/predict";

// Health check
app.get('/health', (req, res) => res.send("OK"));

// Analyze route
app.get('/analyze', async (req, res) => {
  const text = req.query.text || "Hello from Node!";
  try {
    const response = await axios.post(AI_SERVICE_URL, { text });
    res.json(response.data);
  } catch (err) {
    console.error("Error calling AI service:", err.message);
    res.status(500).json({ error: "AI service unavailable" });
  }
});

app.listen(8080, () => console.log("Node.js app running on port 8080"));
