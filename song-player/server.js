// server.js
const express = require('express');
const path = require('path');
const sequelize = require('./db');
const Song = require('./models/Song');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Fixed: Added path.join

// Database Initialization
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false }); // Changed to false after initial setup
    console.log('Database connected and synced');
    
    // Optional: Add some test songs if database is empty
    const songCount = await Song.count();
    if (songCount === 0) {
      await Song.bulkCreate([
        {
          title: 'Sample Song 1',
          artist: 'Artist A',
          filePath: 'song1.mp3', // Make sure this file exists in public/songs/
          duration: 180,
          coverArt: 'cover1.jpg' // Should be in public/covers/
        }
      ]);
      console.log('Added default songs');
    }
  } catch (error) {
    console.error('Database error:', error);
  }
}

// API Routes
app.get('/api/songs', async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/songs', async (req, res) => {
  try {
    // Basic validation
    if (!req.body.title || !req.body.artist || !req.body.filePath) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (error) {
    console.error('Error adding song:', error);
    res.status(400).json({ error: error.message });
  }
});

// Serve frontend
app.get('*', (req, res) => { // Changed to catch all routes
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API Endpoint: http://localhost:${PORT}/api/songs`);
  });
});