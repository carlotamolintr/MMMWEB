import firebase from ‘firebase’;
const config = {
    apiKey: “YOUR_API_KEY”,
    authDomain: “something.firebaseapp.com”,
    databaseURL: “https://something.firebaseio.com",
        projectId: “PROJECT_ID”,
    storageBucket: “”,
    messagingSenderId: “SENDER_ID”,
}
const Firebase = firebase.initializeApp(config);
export default Firebase;