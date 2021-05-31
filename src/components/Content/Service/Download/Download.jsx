import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'

import { AiOutlineCloudDownload as DownloadIcon } from 'react-icons/ai'

import Notification from './Notification'
import IdInput from './IdInput'
import PinInput from './PinInput'

import styles from './Download.module.css'
import { downloadFile } from '../../../../services/shareApi'

const FadeInComponent = styled.div`
  animation: 1.5s ${keyframes`${fadeIn}`};
`

const Download = ({ message, setMessage }) => {
  const [pin, setPin] = useState(null)
  const [id, setId] = useState(null)

  const handelDownload = (event) => {
    event.preventDefault()

    if (!id) {
      setMessage('Hey! No way to find a file without its ID.')
      return
    }

    if (!pin) {
      setMessage('Each file has a PIN. Input yours one.')
      return
    }

    setMessage('Wait a bit. Requesting your file...')
    downloadFile(id, pin).then(
      (url) => {
        setMessage('Hell yeah! Success.')
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
    <FadeInComponent>
      <section className={styles.container}>
        <div className={styles.step_container}>
          <span className={styles.step}>Input the ID of a file.</span>
          <div className={styles.grid_container}>
            <IdInput setId={setId} />
            <div className={styles.message_container}>
              <Notification text={message} />
            </div>
          </div>
        </div>
        <div className={styles.step_container}>
          <p className={styles.step}>Ask the owner of a file for a PIN.</p>
          <div className={styles.grid_container}>
            <PinInput setPin={setPin} />
            <div className={styles.button} onClick={handelDownload}>
              <DownloadIcon className={styles.icon} /> <span>Let's go!</span>
            </div>
          </div>
        </div>
      </section>
      {/* <section className={styles.container}>
        <p>Input ID:</p>
        <input type='text' onChange={handelIdChange} id='input-id' />
        <p>Input PIN:</p>
        <input type='text' onChange={handelPinChange} id='input-download-pin' />
        <br />
        <button onClick={handelDownload}>Download file</button>
        <br />
      </section> */}
    </FadeInComponent>
  )
}

export default Download
