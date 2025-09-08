const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Utility function to read JSON file
const readJSON = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

// ✅ Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await readJSON('./products.json');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read products.json' });
  }
});

// ✅ Get single product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const products = await readJSON('./products.json');
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read products.json' });
  }
});

// ✅ Get categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await readJSON('./category.json');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read categories.json' });
  }
});

// ✅ Get latest products (isNew = true)
app.get('/latest-products', async (req, res) => {
  try {
    const products = await readJSON('./products.json');
    const latest = products
      .filter(p => p.isNew)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read products.json' });
  }
});

// ✅ Live search
app.get('/get-products/search', async (req, res) => {
  try {
    const query = req.query.q;
    console.log(query);

    if (!query) return res.json([]);

    const products = await readJSON('./products.json');
    const results = products.filter(p =>
      p.name.toLowerCase().includes(query.trim().toLowerCase())
    );

    res.json(results.slice(0, 10)); // Max 10 results
  } catch (err) {
    res.status(500).json({ error: 'Failed to read products.json' });
  }
});

// ✅ Root route
app.get('/', (req, res) => {
  res.send('API is running with JSON files...');
});

// Start server
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
