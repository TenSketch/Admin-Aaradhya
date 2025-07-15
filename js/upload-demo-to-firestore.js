// upload-demo-to-firestore.js
// Usage: Temporarily include this script in your HTML as a module to upload demo data to Firestore.
import { db, collection, addDoc } from './firestore.js';
import { demoData } from './demo-data.js';

async function uploadCollection(colName, dataArr) {
  const colRef = collection(db, colName);
  for (const item of dataArr) {
    // Remove the local id field if present, Firestore will generate its own
    const { id, ...docData } = item;
    await addDoc(colRef, docData);
  }
  console.log(`Uploaded ${dataArr.length} documents to '${colName}' collection.`);
}

async function uploadAllDemoData() {
  if (demoData.donations) await uploadCollection('donations', demoData.donations);
  if (demoData.contacts) await uploadCollection('contacts', demoData.contacts);
  // Add more collections as needed
  console.log('All demo data uploaded!');
}

uploadAllDemoData();
