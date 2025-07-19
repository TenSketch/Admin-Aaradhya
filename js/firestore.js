// firestore.js - Firestore setup and helpers
// firestore.js - API helpers for backend connectivity

const API_BASE = 'https://adminaaradhya.onrender.com/api';

export async function getCollection(collectionName) {
  const res = await fetch(`${API_BASE}/${collectionName}`);
  if (!res.ok) throw new Error('Failed to fetch collection');
  return await res.json();
}

export async function addToCollection(collectionName, data) {
  const res = await fetch(`${API_BASE}/${collectionName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to add document');
  return await res.json();
}
