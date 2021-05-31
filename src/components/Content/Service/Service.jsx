import Download from './Download'
import Upload from './Upload'

import styles from './Service.module.css'

const Service = ({ message, setMessage, service }) => {
  return (
    <div className={styles.container}>
      {service === 'Upload' ? (
        <Upload message={message} setMessage={setMessage} />
      ) : (
        <Download message={message} setMessage={setMessage} />
      )}
    </div>
  )
}

export default Service
