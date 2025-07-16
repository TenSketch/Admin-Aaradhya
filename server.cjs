
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Place your Firebase service account key here
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Use Firebase Auth REST API for password verification
const FIREBASE_API_KEY = 'AIzaSyAcNV_dCwZF-rgzqhFIyy4qiyBxmK3HjrY';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Login route for authentication
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password required.' });
  }
  try {
    // Firebase Auth REST API endpoint
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    });
    const result = await response.json();
    if (result && result.idToken) {
      // Successful login
      return res.json({ success: true, uid: result.localId, token: result.idToken });
    } else {
      // Failed login
      return res.status(401).json({ success: false, error: result.error?.message || 'Invalid email or password.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// Example route: Get all documents from a collection
app.get('/api/:collection', async (req, res) => {
  try {
    const snapshot = await db.collection(req.params.collection).get();
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example route: Add a document to a collection
app.post('/api/:collection', async (req, res) => {
  try {
    const docRef = await db.collection(req.params.collection).add(req.body);
    res.json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
    