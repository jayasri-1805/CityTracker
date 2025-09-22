import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import serviceAccount from "../key.json" assert { type: "json" };

// Firebase config from key.json
const firebaseConfig = {
  projectId: serviceAccount.project_id,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
