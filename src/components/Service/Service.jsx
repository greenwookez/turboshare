import Download from './Download'
import Upload from './Upload'

import styles from './Service.module.css'

const Service = ({ message, setMessage, service }) => {
  return (
    <section className={styles.container}>
      <div className={styles.service}>
        {service === 'Upload' ? (
          <Upload message={message} setMessage={setMessage} />
        ) : (
          <Download message={message} setMessage={setMessage} />
        )}
      </div>
    </section>
  )
}

export default Service
