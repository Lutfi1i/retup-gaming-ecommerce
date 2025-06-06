import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseLogin = {
    apiKey: "AIzaSyBaeyq_l2H6t8zu4TnK7ldmOkk_kKXml58",
    authDomain: "retup-auth-login.firebaseapp.com",
    projectId: "retup-auth-login",
    appId: "1:604623996934:web:687d0e4da34687c5ca1b87"
}

const app = initializeApp(firebaseLogin);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };