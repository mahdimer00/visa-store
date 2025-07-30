// Imports
const sqlite3 = require('sqlite3').verbose();

// Database Connection
// Using in-memory database for testing in Netlify's ephemeral environment
// For production, switch to a managed database (e.g., Supabase, PlanetScale)
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to in-memory SQLite database');
});

// Initialize Database Schema
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticketId TEXT UNIQUE,
      phoneType TEXT,
      phoneModel TEXT,
      customerName TEXT,
      customerPhone TEXT,
      issue TEXT,
      status TEXT,
      errorReason TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error creating tickets table:', err);
    } else {
      console.log('Tickets table initialized');
    }
  });
}

// Call Initialization
initializeDatabase();

// Export
module.exports = db;