import firebase from "firebase";

const firebaseConfig = {
   apiKey: "AIzaSyBYKoepRQcaDPkdjurGLrxrzqafDL3WVls",
   authDomain: "netflix-clone-66ba7.firebaseapp.com",
   projectId: "netflix-clone-66ba7",
   storageBucket: "netflix-clone-66ba7.appspot.com",
   messagingSenderId: "993770942564",
   appId: "1:993770942564:web:99b7e71ca88611adf8af71",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export default db;
export { auth };
