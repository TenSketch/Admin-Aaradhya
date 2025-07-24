
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(bodyParser.json());
// Handle CORS preflight for /api/admin/login
app.options('/api/admin/login', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\n/g, '\n'),
  }),
});

// Use Firebase Auth REST API for password verification
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY; // Add this to your .env

app.get('/api/admin/stats', async (req, res) => {
  try {
    const db = admin.firestore();

    // Donations
    const donationsSnap = await db.collection('donations').get();
    let totalDonations = 0;
    const donorSet = new Set();
    donationsSnap.forEach(doc => {
      const data = doc.data();
      if (data.amount) totalDonations += Number(data.amount);
      if (data.donor) donorSet.add(data.donor);
    });
    const totalDonors = donorSet.size > 0 ? donorSet.size : donationsSnap.size;

    // Enquiries
    const contactsSnap = await db.collection('contacts').get();
    const totalEnquiries = contactsSnap.size;

    // Admins
    const adminsSnap = await db.collection('login').get();
    const activeAdmins = adminsSnap.size;

    res.json({
      totalDonations,
      totalDonors,
      totalEnquiries,
      activeAdmins
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats', details: error.message });
  }
});

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required.' });
  }
  try {
    // Firebase Auth REST API endpoint
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password, returnSecureToken: true })
    });
    const result = await response.json();
    if (result && result.idToken) {
      // Successful login
      return res.json({ success: true, token: result.idToken, uid: result.localId });
    } else {
      // Failed login
      return res.status(401).json({ success: false, message: result.error?.message || 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
