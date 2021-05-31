import styled, { keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'

import { ReactComponent as DownloadImg } from '../../../assets/img/undraw_export_files.svg'
import styles from './DownloadImage.module.css'

const FadeInComponent = styled.div`
  animation: 1.5s ${keyframes`${fadeIn}`};
`
const DownloadImage = () => (
  <FadeInComponent>
    <DownloadImg className={styles.image} />
  </FadeInComponent>
)

export default DownloadImage
