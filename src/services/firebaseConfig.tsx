import { initializeApp } from "firebase/app";
import { getFirestore,collection, addDoc, getDocs, doc, updateDoc,deleteDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDSkc1k2LUG6U3cOENC8rba74v_z_ke_I4",
  authDomain: "loja-pm-41511.firebaseapp.com",
  projectId: "loja-pm-41511",
  storageBucket: "loja-pm-41511.appspot.com",
  
  messagingSenderId: "361225062325",
  appId: "1:361225062325:web:964a955d65f0202ee23bfc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{app,db,getFirestore,collection, addDoc, getDocs, doc, updateDoc,deleteDoc}