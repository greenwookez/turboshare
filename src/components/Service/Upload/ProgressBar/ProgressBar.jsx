import styles from './ProgressBar.module.css'

const ProgressBar = ({ status }) => {
  return (
    <div className={styles.progress_container}>
      <progress className={styles.progress} value={status} max='100' />
    </div>
  )
}

export default ProgressBar
