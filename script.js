// Firebase configuration (replace with your own Firebase project config)
const firebaseConfig = {
  apiKey: "AIzaSyDLch0pSaHR9xFQv_Uy8omfyZkg84fshIQ",
  authDomain: "esp32-project-f6e02.firebaseapp.com",
  databaseURL: "https://esp32-project-f6e02-default-rtdb.firebaseio.com/",
  projectId: "esp32-project-f6e02",
  storageBucket: "esp32-project-f6e02.appspot.com",
  messagingSenderId: "879733802104",
  appId: "1:879733802104:web:9d37c6602e663c81c4547c"
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
