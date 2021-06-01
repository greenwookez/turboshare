import { BsFillLightningFill as IdIcon } from 'react-icons/bs'
import styles from './IdInput.module.css'
const IdInput = ({ setId }) => {
  const handelIdClick = () => {
    document.getElementById('input-id').focus()
  }

  const handelIdChange = (event) => {
    setId(event.target.value)
  }
  return (
    <div onClick={handelIdClick} className={styles.input_container}>
      <IdIcon className={styles.logo_id} />
      <input
        type='text'
        maxLength='6'
        placeholder='id'
        className={styles.input_id}
        onChange={handelIdChange}
        id='input-id'
        inputmode='numeric'
      />
    </div>
  )
}

export default IdInput
