const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;
const cors = require('cors');
const fs = require('fs')
app.use(cors());


// Middleware to parse JSON bodies
app.use(express.json());

// PostgreSQL pool configuration
const pool = new Pool({
  user: 'postgres',
  host: 'leaderboard-db.c5osi0i6ulwh.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'FigureItOut!',
  port: 5432, // Default port for PostgreSQL
  ssl: {
    rejectUnauthorized:false
  }
});

// Route to get data from the database
app.get('/data', async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM Teams');
    res.json(data.rows);
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to insert data into the database
app.post('/data', async (req, res) => {
  // Example: Inserting a team name into a Teams table
  // Adjust according to your actual table structure and data
  const { teamName } = req.body;
  try {
    const result = await pool.query('INSERT INTO Teams (team_name) VALUES ($1) RETURNING *', [teamName]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
