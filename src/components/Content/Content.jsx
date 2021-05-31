import { useState } from 'react'

import Service from './Service'
import Info from './Info'
import UploadImage from './UploadImage'
import DownloadImage from './DownloadImage'

import styles from './Content.module.css'

const Content = () => {
  const [message, setMessage] = useState(null)
  const [service, setService] = useState('Upload')

  const resetMessage = () => setMessage(null)

  return (
    <div className={styles.container}>
      <section className={styles.top_container}>
        <div className={styles.info}>
          <Info
            service={service}
            setService={setService}
            resetMessage={resetMessage}
          />
        </div>

        <div className={styles.image_container}>
          {/* {service === 'Upload' ? <UploadImage /> : <DownloadImage />} */}
          <UploadImage />
        </div>
      </section>
      <section className={styles.bottom_container}>
        <div className={styles.service}>
          <Service
            message={message}
            setMessage={setMessage}
            service={service}
          />
        </div>
      </section>
    </div>
  )
}

export default Content
