const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
const isDevelopment = process.env.NODE_ENV !== 'production';

// CORS: Only needed in development
if (isDevelopment) {
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
  console.log('🔧 Development: CORS enabled for localhost:5173');
} else {
  console.log('🚀 Production: CORS disabled (same origin)');
}

app.use(express.json());

// Serve static files in production
if (!isDevelopment) {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Proxy endpoint for Azure ML
app.post('/api/score', async (req, res) => {
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

// SPA fallback - serve React app for all other routes
if (!isDevelopment) {
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});