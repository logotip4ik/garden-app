import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB54xV2o0-3HfWpKDlXdWV-Sk-EQYRsfcE',
  authDomain: 'garden-app-b069d.firebaseapp.com',
  projectId: 'garden-app-b069d',
  storageBucket: 'garden-app-b069d.appspot.com',
  messagingSenderId: '317442427051',
  appId: '1:317442427051:web:8e143467826844d0e8cfee',
}

firebase.initializeApp(firebaseConfig)

export const fire = firebase
