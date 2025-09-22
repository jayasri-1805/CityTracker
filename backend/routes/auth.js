import express from "express";
import { db } from "../config/firebase.js";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const q = query(collection(db, "users"), where("email", "==", email));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return res.status(400).json({ error: "User already exists" });
    }

    await addDoc(collection(db, "users"), { name, email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const q = query(
      collection(db, "users"),
      where("email", "==", email),
      where("password", "==", password)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

