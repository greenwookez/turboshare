import Buttons from './Buttons'
import styles from './Info.module.css'

const Info = ({ service, setService, resetMessage }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Rapid share with
        <br />
        <span className={styles.colorize}>
          <span>turboshare</span>
        </span>
      </div>
      <div className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
        provident aliquid quidem quod quos voluptatem iste ad possimus iure.
        Beatae veritatis non sit alias accusantium mollitia soluta voluptate
        sequi maiores.
      </div>
      <Buttons
        service={service}
        setService={setService}
        resetMessage={resetMessage}
      />
    </div>
  )
}

export default Info
