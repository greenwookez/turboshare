/* eslint-disable import/no-anonymous-default-export */
import firebase from 'firebase/app'
import 'firebase/storage'

import firebaseConfig from './config.js'

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()

const getMetadata = (path) => {
  return storage.ref(path).getMetadata()
}

const updateMetadata = (path, metadata) => {
  storage.ref(path).updateMetadata(metadata)
}

const upload = (file, path, snapshot, error, success) => {
  storage.ref(path).put(file).on('state_changed', snapshot, error, success)
}

const download = (path) => {
  return storage.ref(path).getDownloadURL()
}

export { storage, getMetadata, updateMetadata, upload, download }
