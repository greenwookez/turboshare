import { useState } from 'react'

import { uploadFile, downloadFile } from './services/storage.js'

function App() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState(0) // up to 100
  const [pin, setPin] = useState(null)

  const handelChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handelUpload = () => {
    console.log(file)

    const handelSnapshot = (snapshot) => {
      setStatus(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )
    }

    const handelError = (error) => {
      console.log(error)
    }

    setPin(uploadFile(file, handelSnapshot, handelError))
  }

  const handelInputChange = (event) => {
    //TODO: validate PIN
    setPin(event.target.value)
  }

  const handelDownload = (event) => {
    event.preventDefault()
    downloadFile(pin).then((link) => {
      window.open(link, '_blank')
    })
  }

  return (
    <div className='App'>
      <h1>Hello, this is turboshare!</h1>
      <input type='file' onChange={handelChange} />
      <button onClick={handelUpload}>Upload file</button>
      <br />
      {status < 100 ? (
        <progress value={status} max='100' />
      ) : (
        <div>Done! Your PIN is {pin}</div>
      )}
      <br />
      <form>
        <input type='text' onChange={handelInputChange} />
        <button onClick={handelDownload}>Download file</button>
      </form>
    </div>
  )
}

export default App
