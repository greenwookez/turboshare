import firebase from 'firebase/app'
import 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyBzM3BvrWRSIcXZRww9axtM5CFMDSDi6BU',
  authDomain: 'turboshare-a5d5c.firebaseapp.com',
  projectId: 'turboshare-a5d5c',
  storageBucket: 'turboshare-a5d5c.appspot.com',
  messagingSenderId: '1031477830777',
  appId: '1:1031477830777:web:9ea532cfefd02aed65a0a8',
  measurementId: 'G-P3XJRS318N',
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

const uploadFile = (file, snapshot, error, success = null) => {
  //generate a pin
  const pin = Math.floor(Math.random() * 10000)
  console.log(pin)
  const uploadTask = storage.ref(`files/${pin}`).put(file)

  uploadTask.on('state_changed', snapshot, error, success)

  return pin
}

const downloadFile = (pin) => {
  return storage.ref('files').child(pin).getDownloadURL()
}

export { storage, uploadFile, downloadFile, firebase as default }
