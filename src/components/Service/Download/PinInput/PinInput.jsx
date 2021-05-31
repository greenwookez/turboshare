import { BsFillLockFill as LockIcon } from 'react-icons/bs'
import styles from './PinInput.module.css'

const PinInput = ({ setPin }) => {
  const handelPinClick = () => {
    document.getElementById('input-download-pin').focus()
  }

  const handelPinChange = (event) => {
    setPin(event.target.value)
  }
  return (
    <div onClick={handelPinClick} className={styles.input_container}>
      <LockIcon className={styles.logo_pin} />
      <input
        type='text'
        maxLength='4'
        placeholder='code'
        className={styles.input_pin}
        onChange={handelPinChange}
        id='input-download-pin'
      />
    </div>
  )
}

export default PinInput
