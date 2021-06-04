import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase
  .initializeApp({
    apiKey: 'AIzaSyDm6rbP4rNRymW9lFcGlMrS30fq3K8sVmY',
    authDomain: 'friendly-chat-ba6a2.firebaseapp.com',
    projectId: 'friendly-chat-ba6a2',
    storageBucket: 'friendly-chat-ba6a2.appspot.com',
    messagingSenderId: '1010637079150',
    appId: '1:1010637079150:web:71732032de2e148d2f5c7f',
  })
  .auth();
