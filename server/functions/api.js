// Imports
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const db = require('../database/db');

// Initialize Express
const app = express();
app.use(cors({
  origin: ['https://your-netlify-site.netlify.app', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT'],
  credentials: true
}));
app.use(express.json());

// Helper Functions
const generateTicketId = async () => {
  return new Promise((resolve, reject) => {
    db.get('SELECT MAX(id) as maxId FROM tickets', (err, row) => {
      if (err) {
        console.error('Error generating ticket ID:', err);
        return reject(err);
      }
      const nextId = (row.maxId || 0) + 1;
      resolve(`VS-${nextId}`);
    });
  });
};

// Routes
// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

// Create Ticket
app.post('/tickets', async (req, res) => {
  try {
    const ticketId = await generateTicketId();
    const { phoneType, phoneModel, customerName, customerPhone, issue, status, errorReason } = req.body;
    
    // Validate Input
    if (!phoneType || !phoneModel || !customerName || !customerPhone || !issue) {
      return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
    }

    db.run(
      `INSERT INTO tickets (ticketId, phoneType, phoneModel, customerName, customerPhone, issue, status, errorReason)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [ticketId, phoneType, phoneModel, customerName, customerPhone, issue, status || 'لم يتم الصيانة بعد', errorReason || ''],
      (err) => {
        if (err) {
          console.error('Error inserting ticket:', err);
          return res.status(500).json({ error: 'فشل إنشاء التذكرة' });
        }
        res.status(201).json({ ticketId });
      }
    );
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'خطأ في الخادم' });
  }
});

// Get Ticket by ID
app.get('/tickets/:ticketId', (req, res) => {
  const { ticketId } = req.params;
  db.get('SELECT * FROM tickets WHERE ticketId = ?', [ticketId], (err, row) => {
    if (err) {
      console.error('Error fetching ticket:', err);
      return res.status(500).json({ error: 'خطأ في الخادم' });
    }
    if (!row) {
      return res.status(404).json({ error: 'التذكرة غير موجودة' });
    }
    res.json(row);
  });
});

// Get All Tickets or Filtered
app.get('/tickets', (req, res) => {
  const { customerPhone, status } = req.query;
  let query = 'SELECT * FROM tickets';
  const params = [];
  let whereClause = '';

  if (customerPhone) {
    whereClause += ' WHERE customerPhone = ?';
    params.push(customerPhone);
  } else if (status) {
    whereClause += ' WHERE status = ?';
    params.push(status);
  }

  query += whereClause;

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error fetching tickets:', err);
      return res.status(500).json({ error: 'خطأ في الخادم' });
    }
    res.json(rows);
  });
});

// Update Ticket
app.put('/tickets/:ticketId', (req, res) => {
  const { ticketId } = req.params;
  const { status, errorReason } = req.body;

  // Validate Input
  if (!status) {
    return res.status(400).json({ error: 'حالة التذكرة مطلوبة' });
  }

  db.run(
    'UPDATE tickets SET status = ?, errorReason = ? WHERE ticketId = ?',
    [status, errorReason || '', ticketId],
    (err) => {
      if (err) {
        console.error('Error updating ticket:', err);
        return res.status(500).json({ error: 'فشل تحديث التذكرة' });
      }
      res.json({ message: 'تم تحديث التذكرة' });
    }
  );
});

// Export for Netlify Functions
module.exports.handler = serverless(app);