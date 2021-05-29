import { useState } from 'react'

import styles from './App.module.css'
import { uploadFile, downloadFile } from './services/storage.js'

const App = () => {
  const [file, setFile] = useState(null)

  const [uploadStatus, setUploadStatus] = useState(0)
  const [message, setMessage] = useState(
    'Upload a file or download it if you already done it.'
  )
  const [id, setId] = useState(null)
  const [pin, setPin] = useState(null)

  const handelIdChange = (event) => {
    //TODO: validate ID
    setId(event.target.value)
  }

  const handelPinChange = (event) => {
    setPin(event.target.value)
  }

  const handelFileChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const validatePin = (pin) => {
    if (pin.length !== 4) return false
    if (!pin.match(/^[0-9]{4}/)) return false

    return true
  }

  const handelUpload = () => {
    if (!file) {
      setMessage('Choose file first.')
      return
    }

    if (!pin) {
      setMessage('Input PIN first.')
      return
    }

    if (!validatePin(pin)) {
      setMessage('PIN is incorrect. PIN must consist only 4 digits.')
      return
    }

    setMessage('Uploading in process. Please, wait.')

    const handelSnapshot = (snapshot) => {
      setUploadStatus(
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      )
    }

    const handelError = (error) => {
      console.log(error)
    }

    const handelSuccess = (id) => {
      setMessage(`You have sucessfully uploaded your file! ID: ${id}.`)
      document.getElementById('input-pin').value = ''
      document.getElementById('input-file').value = ''
      setFile(null)
      setUploadStatus(0)
    }

    uploadFile(file, handelSnapshot, handelError, handelSuccess, pin)
  }

  const handelDownload = (event) => {
    event.preventDefault()

    if (!id) {
      setMessage('Input ID first.')
      return
    }

    if (!pin) {
      setMessage('You have to input PIN to download the file.')
      return
    }

    setMessage('Requesting your file.')
    downloadFile(id, pin).then(
      (url) => {
        setMessage('Success!')
        document.getElementById('input-id').value = ''
        document.getElementById('input-download-pin').value = ''

        window.open(url, '_blank')

        setPin(null)
        setId(null)
      },
      (error) => {
        setMessage(error.message)
      }
    )
  }

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.logo}>
          <img
            src='https://sun9-71.userapi.com/impg/23FQ_d5mzEjdu3p_7DMkp3e-bHmvKFTpkAp_Ug/I0nhKN9_-qY.jpg?size=667x213&quality=96&sign=1a30e653fbecfc3d298c395e4e31eaee&type=album'
            alt='logo'
          />
        </div>
        <div className={styles.title}>Hello, this is turboshare!</div>
        <div className={styles.message}>
          <code>{message}</code>
        </div>
      </header>
      <div className={styles.layout}>
        <div className={styles.upload}>
          <input type='file' onChange={handelFileChange} id='input-file' />
          <p>Enter PIN for your file</p>
          <input type='text' onChange={handelPinChange} id='input-pin' />
          <br />
          <button onClick={handelUpload}>Upload file</button>
          <br />
          <br />
          <progress value={uploadStatus} max='100' />
        </div>
        <div className={styles.download}>
          <p>Input ID:</p>
          <input type='text' onChange={handelIdChange} id='input-id' />
          <p>Input PIN:</p>
          <input
            type='text'
            onChange={handelPinChange}
            id='input-download-pin'
          />
          <br />
          <button onClick={handelDownload}>Download file</button>
          <br />
        </div>
      </div>
    </div>
  )
}

export default App
