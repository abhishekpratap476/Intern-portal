const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());

// Function to read JSON files
const readJsonFile = (filename) => {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};

// Load data from JSON files
let user = readJsonFile('user.json');
let leaderboard = readJsonFile('leaderboard.json');

// Fallback data in case JSON files are not found
const fallbackUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  referralCode: "REF123456",
  totalDonations: 18500,
  rank: 5,
  referrals: 15,
  thisMonth: 3200,
  lastMonth: 2800
};

const fallbackLeaderboard = [
  { name: "Sarah Johnson", amount: 45000, referrals: 25, rank: 1 },
  { name: "Michael Chen", amount: 38000, referrals: 22, rank: 2 },
  { name: "Emily Rodriguez", amount: 32000, referrals: 18, rank: 3 },
  { name: "David Kim", amount: 28000, referrals: 20, rank: 4 },
  { name: "John Doe", amount: 18500, referrals: 15, rank: 5 }
];

// Routes
app.get('/api/user', (req, res) => {
  const userData = user || fallbackUser;
  res.json(userData);
});

app.get('/api/leaderboard', (req, res) => {
  const leaderboardData = leaderboard || fallbackLeaderboard;
  res.json(leaderboardData);
});

// Utility endpoint to reload data from JSON files
app.post('/api/reload-data', (req, res) => {
  try {
    // Reload data from JSON files
    const newUser = readJsonFile('user.json');
    const newLeaderboard = readJsonFile('leaderboard.json');
    
    if (newUser) user = newUser;
    if (newLeaderboard) leaderboard = newLeaderboard;
    
    res.json({ 
      success: true, 
      message: 'Data reloaded successfully',
      userLoaded: !!newUser,
      leaderboardLoaded: !!newLeaderboard
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to reload data',
      error: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    dataSources: {
      user: !!user,
      leaderboard: !!leaderboard
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Data loaded from JSON files:');
  console.log(`- User data: ${user ? 'Loaded' : 'Using fallback'}`);
  console.log(`- Leaderboard data: ${leaderboard ? 'Loaded' : 'Using fallback'}`);
});
