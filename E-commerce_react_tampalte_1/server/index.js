const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Generate JWT token
const generateToken = user => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// get products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// get single product by id
app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  db.query(
    'SELECT * FROM products WHERE id = ?',
    [productId],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(results[0]); // single product
    }
  );
});

// get category
app.get('/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// get latest-products (only isNew = true)
app.get('/latest-products', (req, res) => {
  db.query(
    'SELECT * FROM products WHERE isNew = true ORDER BY createdAt DESC',
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      res.json(results);
    }
  );
});

// Live search route
app.get('/get-products/search', (req, res) => {
  const query = req.query.q;
  console.log('Query received:', query);

  if (!query) return res.json([]);

  const sql = `
    SELECT * 
    FROM products 
    WHERE TRIM(LOWER(name)) LIKE ?
    LIMIT 10
  `;

  // ইউজারের input trim করে lowercase করা
  const searchTerm = `%${query.trim().toLowerCase()}%`;

  db.query(sql, [searchTerm], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database query failed' });
    }

    console.log('DB Results:', results); // দেখুন কনসোলে কি আসছে
    res.json(results);
  });
});

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
