import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import { seedDatabase } from '../seed';

const config = {
  apiKey: "AIzaSyB__l74yUCYV2T52ZQdwM8oINni0PLRO78",
  authDomain: "netflix-a335e.firebaseapp.com",
  databaseURL: "https://netflix-a335e.firebaseio.com",
  projectId: "netflix-a335e",
  storageBucket: "netflix-a335e.appspot.com",
  messagingSenderId: "149933622655",
  appId: "1:149933622655:web:6642cd57f966d203da464a"
};

const firebase = Firebase.initializeApp(config);
//seedDatabase(firebase);
export { firebase };