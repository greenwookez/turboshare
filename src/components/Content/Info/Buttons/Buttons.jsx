import styles from './Buttons.module.css'

const Buttons = ({ service, setService, resetMessage }) => {
  const handelUploadClick = (event) => {
    setService('Upload')
    resetMessage()
  }

  const handelDownloadClick = (event) => {
    setService('Download')
    resetMessage()
  }
  return (
    <div className={styles.buttons}>
      <div
        onClick={handelUploadClick}
        className={`${styles.button} ${
          service !== 'Upload' ? styles.inactive : null
        }`}
      >
        Upload
      </div>
      <div
        onClick={handelDownloadClick}
        className={`${styles.button} ${
          service !== 'Download' ? styles.inactive : null
        }`}
      >
        Download
      </div>
    </div>
  )
}

export default Buttons
