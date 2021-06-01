import { FaFileAlt as AddIcon } from 'react-icons/fa'

import styles from './FileInput.module.css'

const FileInput = ({ file, setFile, resetStatus, setMessage }) => {
  const handelBrowse = () => {
    setTimeout(() => {
      document.getElementById('input-pin').focus()
    }, 500)
  }
  const handelFileChange = (event) => {
    resetStatus()
    setMessage('')

    if (event.target.files[0].size > 40 * 1024 * 1024) {
      setMessage('Your file is too big. Limited size is 40mb.')
      return
    }

    if (event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  return (
    <label>
      <div className={styles.file_container}>
        <div onClick={handelBrowse} className={styles.custom_input_file}>
          <AddIcon className={styles.icon} />
          Browse
        </div>
        <span className={styles.file_name}>
          {file ? file.name : 'No file selected'}
        </span>
      </div>
      <input
        type='file'
        className={styles.input_file}
        onChange={handelFileChange}
        id='input-file'
      />
    </label>
  )
}

export default FileInput
