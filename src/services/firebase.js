// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyAQrOIe9BE_qhITGZC349xjeUX088-Iacw',

  authDomain: 'chat-room-5df92.firebaseapp.com',

  projectId: 'chat-room-5df92',

  storageBucket: 'chat-room-5df92.appspot.com',

  messagingSenderId: '115380289597',

  appId: '1:115380289597:web:f49f4175334bd729a5aa54',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const { user } = await signInWithPopup(auth, provider);

    return { uid: user.uid, displayName: user.displayName };
  } catch (error) {
    if (error.code !== 'auth/cancelled-popup-request') {
      console.error(error);
    }
    return null;
  }
}

async function sendMessage(roomId, user, text) {
  try {
    await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
      uid: user.uid,
      displayName: user.displayName,
      text: text.trim(),
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}

function getMessages(roomId, callback) {
  return onSnapshot(
    query(
      collection(db, 'chat-rooms', roomId, 'messages'),
      orderBy('timestamp', 'asc')
    ),
    (querySnapsot) => {
      const messages = querySnapsot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    }
  );
}

export { loginWithGoogle, sendMessage, getMessages };
