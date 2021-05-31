import { ReactComponent as Img } from '../../assets/img/undraw_file_sync.svg'
import styles from './Image.module.css'

const Image = () => (
  <section className={styles.image_container}>
    <Img className={styles.image} />
  </section>
)

export default Image
