const firebaseConfig = {
  apiKey: "AIzaSyAbPwlCb3OPNAeiZDhb9NsttjGpwKr--1o",
  authDomain: "amedon-site.firebaseapp.com",
  projectId: "amedon-site",
  storageBucket: "amedon-site.firebasestorage.app",
  messagingSenderId: "791391370652",
  appId: "1:791391370652:web:80a7300658e5eef5e1dc59",
  measurementId: "G-G6J9RHSYK0"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();