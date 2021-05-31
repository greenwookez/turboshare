import { useState } from 'react'

import Service from './components/Service'
import Info from './components/Info'
import Image from './components/Image'
import styles from './App.module.css'

const App = () => {
  const [service, setService] = useState('Upload')
  const [message, setMessage] = useState('')

  const resetMessage = () => {
    setMessage('')
  }
  return (
    <div className={styles.container}>
      <div className={styles.top_container}>
        <Info
          service={service}
          setService={setService}
          resetMessage={resetMessage}
        />
        <Image />
      </div>
      <Service service={service} message={message} setMessage={setMessage} />
    </div>
  )
}

export default App
