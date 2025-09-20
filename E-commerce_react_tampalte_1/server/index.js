const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.csfnsag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    console.log('✅ MongoDB connected successfully');

    const db = client.db('Online-Buzz');
    const productsCollection = db.collection('products');
    const categoriesCollection = db.collection('categories');

    // -------------------- Routes --------------------

    // Test route
    app.get('/', (req, res) => {
      res.send('🚀 Server is running fine!');
    });
    // ✅ Get all products
    app.get('/products', async (req, res) => {
      try {
        const products = await productsCollection.find().toArray();
        res.json(products);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
      }
    });

    // ✅ Get single product by ID
    app.get('/products/:id', async (req, res) => {
      try {
        const product = await productsCollection.findOne({
          id: parseInt(req.params.id),
        });
        if (!product)
          return res.status(404).json({ error: 'Product not found' });
        res.json(product);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch product' });
      }
    });

    // ✅ Get all categories
    app.get('/categories', async (req, res) => {
      try {
        const categories = await categoriesCollection.find().toArray();
        res.json(categories);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch categories' });
      }
    });

    // ✅ Latest products (isNew = true)
    app.get('/latest-products', async (req, res) => {
      try {
        const latest = await productsCollection
          .find({ isNew: true })
          .sort({ createdAt: -1 })
          .toArray();
        res.json(latest);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch latest products' });
      }
    });

    // ✅ Live search
    app.get('/get-products/search', async (req, res) => {
      try {
        const query = req.query.q;
        if (!query) return res.json([]);
        const regex = new RegExp(query, 'i'); // case-insensitive
        const results = await productsCollection
          .find({ name: regex })
          .limit(10)
          .toArray();
        res.json(results);
      } catch (err) {
        res.status(500).json({ error: 'Failed to search products' });
      }
    });

    // Ping MongoDB to confirm connection
    // await client.db('admin').command({ ping: 1 });
    console.log('🏓 Pinged MongoDB successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    // setTimeout(run, 5000); // Retry after 5 seconds
  }
}

// Run the connection
run();

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
