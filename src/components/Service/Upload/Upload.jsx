import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'

import { AiOutlineCloudUpload as UploadIcon } from 'react-icons/ai'

import FileInput from './FileInput'
import PinInput from './PinInput'
import ProgressBar from './ProgressBar'

import styles from './Upload.module.css'
import validatePin from '../../../utils/validatePin'
import { uploadFile } from '../../../services/shareApi'

const FadeInComponent = styled.div`
  animation: 1.5s ${keyframes`${fadeIn}`};
`

const Upload = ({ message, setMessage }) => {
  const [file, setFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState(0)
  const [pin, setPin] = useState(null)

  const handelUpload = () => {
    if (!file) {
      setMessage('Hey! No file. Choose it.')
      return
    }

    if (!pin) {
      setMessage('Prevent somebody from downloading your data. Set a PIN.')
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
      setMessage(`Your file has been sucessfuly uploaded. ID: ${id}.`)
      document.getElementById('input-pin').value = ''
      document.getElementById('input-file').value = ''
      setFile(null)
      setUploadStatus(0)
    }

    uploadFile(file, handelSnapshot, handelError, handelSuccess, pin)
  }

  return (
    <FadeInComponent>
      <section className={styles.container}>
        <ProgressBar status={uploadStatus} />
        <div className={styles.step_container}>
          {/* <span className={styles.step}>Firstly, choose the file.</span> */}
          <div className={styles.grid_container}>
            <FileInput file={file} setFile={setFile} message={message} />
            <div className={styles.message_container}>
              <span className={styles.message}>{message}</span>
            </div>
          </div>
        </div>
        <div className={styles.step_container}>
          {/* <p className={styles.step}>Then secure your file with 4 digit PIN.</p> */}
          <div className={styles.grid_container}>
            <PinInput setPin={setPin} />
            <div className={styles.button} onClick={handelUpload}>
              <UploadIcon className={styles.icon} /> <span>Let's go!</span>
            </div>
          </div>
        </div>
      </section>
    </FadeInComponent>
  )
}

export default Upload
