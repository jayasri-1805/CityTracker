import express from "express";
import { db } from "../config/firebase.js";
import { collection, addDoc, getDocs } from "firebase/firestore";

const router = express.Router();

// ✅ Create a ride
router.post("/book", async (req, res) => {
  try {
    const { userId, pickup, destination } = req.body;

    if (!userId || !pickup || !destination) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const newRide = {
      userId,
      pickup,
      destination,
      status: "pending",
      createdAt: new Date(),
    };

    await addDoc(collection(db, "rides"), newRide);
    res.status(201).json({ message: "Ride booked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all rides
router.get("/", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "rides"));
    const rides = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
