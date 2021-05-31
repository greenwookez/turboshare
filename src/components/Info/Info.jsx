import Buttons from './Buttons'
import styles from './Info.module.css'

const Info = ({ service, setService, resetMessage }) => {
  return (
    <section className={styles.container}>
      <div>
        <div className={styles.title}>
          Rapid share with
          <br />
          <span className={styles.colorize}>
            <span>turboshare</span>
          </span>
        </div>
        <div className={styles.description}>
          Turboshare allows you to share your files between different devices in
          a couple of seconds with no need of sign up or authorization. Powered
          by Google Firebase Storage turboshare secures your data with the
          Firebase Security Rules.
        </div>
        <Buttons
          service={service}
          setService={setService}
          resetMessage={resetMessage}
        />
      </div>
    </section>
  )
}

export default Info
