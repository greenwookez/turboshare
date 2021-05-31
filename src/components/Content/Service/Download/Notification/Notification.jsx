import styled, { keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'

const FadeInComponent = styled.div`
  animation: 1.5s ${keyframes`${fadeIn}`};
`

const Notification = ({ text }) => <FadeInComponent>{text}</FadeInComponent>

export default Notification
