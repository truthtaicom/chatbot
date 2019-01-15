const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

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

exports.api = functions.https.onRequest(app);
