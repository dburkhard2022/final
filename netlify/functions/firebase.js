const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyDdvBHgihWC0tadXR1CKJLO2JuC3NcZZIM",
  authDomain: "kiei-451-djb.firebaseapp.com",
  projectId: "kiei-451-djb",
  storageBucket: "kiei-451-djb.appspot.com",
  messagingSenderId: "63784394225",
  appId: "1:63784394225:web:46fac205aebc0c05a03850"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase