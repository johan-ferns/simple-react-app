const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for your React app
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Proxy endpoint for Azure ML
app.post('/score', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    
    const response = await fetch(
      process.env.ENDPOINT_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ENDPOINT_KEY}`,
        },
        body: JSON.stringify(req.body)
      }
    );
    
    const data = await response.json();
    console.log('Azure ML response:', data);
    
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error calling Azure ML:', error);
    res.status(500).json({ 
      error: 'Failed to call Azure ML API',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running on http://localhost:${PORT}`);
});