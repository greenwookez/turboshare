import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'

import { AiOutlineCloudDownload as DownloadIcon } from 'react-icons/ai'

import IdInput from './IdInput'
import PinInput from './PinInput'

import styles from './Download.module.css'
import { downloadFile } from '../../../services/shareApi'

const FadeInComponent = styled.div`
  animation: 1.5s ${keyframes`${fadeIn}`};
`

const Download = ({ setMessage, message }) => {
  const [pin, setPin] = useState(null)
  const [id, setId] = useState(null)
  const [downloadActive, setDownloadActive] = useState(false)

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

    setDownloadActive(true)
    setMessage('Wait a bit. Requesting your file...')

    const newWindow = window.open()
    downloadFile(id, pin).then(
      (url) => {
        setDownloadActive(false)
        setMessage('Hell yeah! Success.')
        document.getElementById('input-id').value = ''
        document.getElementById('input-download-pin').value = ''

        newWindow.location = url

        setPin(null)
        setId(null)
      },
      (error) => {
        setDownloadActive(false)
        console.log(error.message)
        switch (error.message) {
          case '1':
            setMessage(`Can't find a file. Check the ID.`)
            break
          case '2':
            setMessage('Ooops... Wrong PIN. Try again.')
            break
          default:
            setMessage('Hmm... Unexpected error. Please, try again.')
            break
        }
      }
    )
  }
  return (
    <FadeInComponent>
      <section className={styles.container}>
        <div className={downloadActive ? styles.pointer_events_none : null}>
          <div className={styles.grid_container}>
            <IdInput setId={setId} />
            <div className={styles.message_container}>
              <span className={styles.message}>{message}</span>
            </div>
          </div>
        </div>

        <div className={downloadActive ? styles.pointer_events_none : null}>
          <div className={styles.grid_container}>
            <PinInput setPin={setPin} />
            <div className={styles.button} onClick={handelDownload}>
              <DownloadIcon className={styles.icon} />
              <span>Let's go!</span>
            </div>
          </div>
        </div>
      </section>
    </FadeInComponent>
  )
}

export default Download
