/* eslint-disable import/no-anonymous-default-export */
import {
  storage,
  getMetadata,
  updateMetadata,
  upload,
  download,
} from './storageApi'

const checkId = async (id) => {
  //returns TRUE if ID is unique and FALSE in other case
  return storage
    .ref(`files/${id}`)
    .listAll()
    .then(({ items }) => {
      if (!items[0]) {
        return true
      }
    })
}

const generateId = async () => {
  // generate an ID
  let id = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0')

  // check generated ID for uniqueness
  const result = await checkId(id)

  if (!result) {
    // if ID is not unique then repeat recursively
    return generateId()
  }

  // if everything is ok return generated ID
  return id
}

const uploadFile = async (file, snapshot, error, success, pin) => {
  const id = await generateId()
  const path = `files/${id}/${file.name}`
  upload(file, path, snapshot, error, () => {
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
          reject(new Error(`Can't find a file. Check the ID.`))
          return
        }

        const resRef = `${baseRef}/${items[0].name}`

        return getMetadata(resRef).then(({ customMetadata }) => {
          if (customMetadata.pin !== pin) {
            reject(new Error('Ooops... Wrong PIN. Try again.'))
          }

          return download(resRef).then((url) => resolve(url))
        })
      })
  })
}

export { uploadFile, downloadFile }
