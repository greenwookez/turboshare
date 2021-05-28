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

const uploadFile = (file, snapshot, error, success, pin) => {
  //TODO: check if the id is unique
  //generate an ID
  const id = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0')

  const path = `files/${id}/${file.name}`
  const uploadTask = storage.ref(path).put(file)
  uploadTask.on('state_changed', snapshot, error, () => {
    const newMetadata = {
      customMetadata: {
        id,
        pin,
      },
    }
    success(id)
    updateMetadata(path, newMetadata)
  })

  return id
}

const downloadFile = (id, pin) => {
  const baseRef = `files/${id}`
  return new Promise((resolve, reject) => {
    storage
      .ref(baseRef)
      .listAll()
      .then(({ items }) => {
        if (!items[0]) {
          reject(new Error('No file by this ID!'))
          return
        }
        const resRef = `${baseRef}/${items[0].name}`
        return getMetadata(resRef).then(({ customMetadata }) => {
          if (customMetadata.pin !== pin) {
            reject(new Error('Pin does not match!'))
          }
          return storage
            .ref(resRef)
            .getDownloadURL()
            .then((url) => resolve(url))
        })
      })
  })
}

export { storage, uploadFile, downloadFile, firebase as default }
