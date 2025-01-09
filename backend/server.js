const express = require('express');
const fetch = require('node-fetch'); // To make API requests to NewsAPI
const cors = require('cors'); // To enable CORS for your frontend
const dotenv = require('dotenv'); // To use environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins (you can restrict it later if needed)
app.use(cors());

// Proxy endpoint to fetch data from NewsAPI
app.get('/news', async (req, res) => {
  try {
    // Fetch data from NewsAPI
    const response = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=${process.env.API_KEY}`);
    const data = await response.json();
    res.json(data);  // Send back the API response to the frontend
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));