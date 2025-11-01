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
const db = firebase.database();

// Listen for updates
const touchRef = db.ref("/test/touchValue");
const intRef = db.ref("/test/int");
const floatRef = db.ref("/test/float");

touchRef.on("value", (snapshot) => {
  document.getElementById("touchValue").textContent = snapshot.val();
});

intRef.on("value", (snapshot) => {
  document.getElementById("intValue").textContent = snapshot.val();
});

floatRef.on("value", (snapshot) => {
  document.getElementById("floatValue").textContent = snapshot.val().toFixed(2);
});
