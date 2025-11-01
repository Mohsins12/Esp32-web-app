// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
firebase.initializeApp(firebaseConfig);

// Get a reference to the database
const database = firebase.database();

// Listen for changes in the "test" path
const touchRef = database.ref("/test/touchValue");
const intRef = database.ref("/test/int");
const floatRef = database.ref("/test/float");

// Update HTML when data changes
touchRef.on("value", (snapshot) => {
  const value = snapshot.val();
  document.getElementById("touchValue").textContent = value !== null ? value : "--";
});

intRef.on("value", (snapshot) => {
  const value = snapshot.val();
  document.getElementById("intValue").textContent = value !== null ? value : "--";
});

floatRef.on("value", (snapshot) => {
  const value = snapshot.val();
  document.getElementById("floatValue").textContent = value !== null ? value : "--";
});
