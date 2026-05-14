const firebaseConfig = {
    apiKey: "AIzaSyBWQc0k5MJeiuBx-tSWgZD6ycX5PPW-EHM",
    authDomain: "nagaresort.firebaseapp.com",
    databaseURL: "https://nagaresort-default-rtdb.firebaseio.com",
    projectId: "nagaresort",
    storageBucket: "nagaresort.firebasestorage.app",
    messagingSenderId: "61392211590",
    appId: "1:61392211590:web:8d0dd152fc65d5a7908b07",
    measurementId: "G-GS14190Q2J"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();