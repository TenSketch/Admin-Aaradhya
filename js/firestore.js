// firestore.js - Firestore setup and helpers
import { app } from './firebase-auth.js';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

export const db = getFirestore(app);
export {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
};
