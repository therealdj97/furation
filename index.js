const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/item');
const bodyParser = require('body-parser');
const dotenv = require ('dotenv');
const logger = require('./logger')


require('dotenv').config();
dotenv.config()

const app = express();
app.use(bodyParser.json());

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


const host =process.env.DB_HOST
const passwd=process.env.DB_PASSWD
const name=process.env.CLUSTER_NAME

const MONGODB_URI =`mongodb+srv://${host}:${passwd}@${name}`

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});



// GET /api/items - Retrieve all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    logger.info(`${req.method} ${req.url}`);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/items/:id - Retrieve a specific item by its ID
app.get('/api/items/:id', async (req, res) => {
  try {
    logger.info(`${req.method} ${req.url}`);
    const item = await Item.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/items - Create a new item
app.post('/api/items', async (req, res) => {
  try {

    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    logger.info(`${req.method} ${req.url}`);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/items/:id - Update an existing item by its ID
app.put('/api/items/:id', async (req, res) => {
  try {
    logger.info(`${req.method} ${req.url}`);
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedItem) {
      res.json(updatedItem);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/items/:id - Delete an item by its ID
app.delete('/api/items/:id', async (req, res) => {
  try {
    logger.info(`${req.method} ${req.url}`);
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (deletedItem) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});