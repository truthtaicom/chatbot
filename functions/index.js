const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const cors = require('cors');
const app = express();

const { textQuery } = require('./chatbot')

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/', (req, res) => res.send('Hello'))
app.post('/bot', async (req, res) => {
  try {
    const result = await textQuery(req.body.text, req.body.parameters)
    res.send(result)
  } catch(err) {
    res.status(500).send(err.details)
  }
});

app.get('/products', async (req, res) => {
  const productsRef = await admin.database().ref('/products').once('value')
  const productValue = await productsRef.val()
  res.status(200).json(productValue);
})

exports.api = functions.https.onRequest(app);
