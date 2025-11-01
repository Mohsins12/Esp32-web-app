// Import Firebase modules (v10.7.1)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ✅ Your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDLch0pSaHR9xFQv_Uy8omfyZkg84fshIQ",
  authDomain: "esp32-project-f6e02.firebaseapp.com",
  databaseURL: "https://esp32-project-f6e02-default-rtdb.firebaseio.com",
  projectId: "esp32-project-f6e02",
  storageBucket: "esp32-project-f6e02.firebasestorage.app",
  messagingSenderId: "925177881979",
  appId: "1:925177881979:web:e9a555ec9d9af2cc1089de",
  measurementId: "G-X12SYTY0DD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Database references
const touchRef = ref(db, "/test/touchValue");
const intRef = ref(db, "/test/int");
const floatRef = ref(db, "/test/float");

// Update webpage when values change
onValue(touchRef, (snapshot) => {
  const value = snapshot.val();
  document.getElementById("touchValue").textContent = value ?? "--";
});

onValue(intRef, (snapshot) => {
  const value = snapshot.val();
  document.getElementById("intValue").textContent = value ?? "--";
});

onValue(floatRef, (snapshot) => {
  const value = snapshot.val();
  document.getElementById("floatValue").textContent = value ?? "--";
});
