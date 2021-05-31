import styled, { keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'

import { ReactComponent as UploadImg } from '../../../assets/img/undraw_file_sync.svg'
import styles from './UploadImage.module.css'

const FadeInComponent = styled.div`
  animation: 1.5s ${keyframes`${fadeIn}`};
`
const UploadImage = () => (
  <FadeInComponent>
    <UploadImg className={styles.image} />
  </FadeInComponent>
)

export default UploadImage
