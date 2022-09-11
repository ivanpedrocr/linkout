import { initializeApp } from "@firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD1zAhNSpFc2NB3_deUdLIb645aES_90kE",
  authDomain: "linkout-362119.firebaseapp.com",
  projectId: "linkout-362119",
  storageBucket: "linkout-362119.appspot.com",
  messagingSenderId: "768788399062",
  appId: "1:768788399062:web:f2210fc6c79e1edfc05a77",
  measurementId: "G-MYRB64X8LM",
};

export const initializeFirebase = () => initializeApp(firebaseConfig);
