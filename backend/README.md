# Backend Server Documentation

## Overview
This backend server provides API endpoints for the Intern Portal application, serving user data and leaderboard information from JSON files.

## File Structure
```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies
├── data/             # JSON data files
│   ├── user.json     # User data
│   └── leaderboard.json # Leaderboard data
└── README.md         # This file
```

## Data Files

### user.json
Contains the current user's information:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "referralCode": "REF123456",
  "totalDonations": 18500,
  "rank": 5,
  "referrals": 15,
  "thisMonth": 3200,
  "lastMonth": 2800
}
```

### leaderboard.json
Contains an array of leaderboard entries:
```json
[
  {
    "name": "Sarah Johnson",
    "amount": 45000,
    "referrals": 25,
    "rank": 1
  },
  // ... more entries
]
```

## API Endpoints

### GET /api/user
Returns the current user's data.
- **Response**: User object with all user information
- **Fallback**: Returns fallback data if JSON file is not found

### GET /api/leaderboard
Returns the leaderboard data.
- **Response**: Array of leaderboard entries
- **Fallback**: Returns fallback data if JSON file is not found

### POST /api/reload-data
Reloads data from JSON files without restarting the server.
- **Response**: Success status and data loading information
- **Use case**: Update data files and reload without server restart

### GET /api/health
Health check endpoint.
- **Response**: Server status and data source information

## Running the Server

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   node server.js
   ```

3. The server will start on `http://localhost:5000`

## Data Management

### Updating User Data
1. Edit `data/user.json`
2. Make a POST request to `/api/reload-data` or restart the server

### Updating Leaderboard Data
1. Edit `data/leaderboard.json`
2. Make a POST request to `/api/reload-data` or restart the server

### Adding New Users to Leaderboard
1. Add a new entry to `data/leaderboard.json`
2. Ensure the `rank` field is unique and sequential
3. Reload the data using the reload endpoint

## Error Handling

- If JSON files are not found, the server uses fallback data
- All file reading errors are logged to the console
- The server continues to run even if data files are missing

## Development Tips

- Use the `/api/health` endpoint to check if data is loaded correctly
- The server logs data loading status on startup
- JSON files are read synchronously for simplicity
- Consider using a database for production environments 