import styles from './ProgressBar.module.css'

const ProgressBar = ({ status }) => {
  return (
    <div className={styles.progress_container}>
      {status > 0 ? (
        <progress className={styles.progress} value={status} max='100' />
      ) : null}
    </div>
  )
}

export default ProgressBar
