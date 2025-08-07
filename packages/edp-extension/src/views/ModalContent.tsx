import { Column, Text } from '@stack-spot/citric-react'
import { Logo } from 'components/Logo'

export const ModalContent = () => (
  <Column center gap="20px">
    <Logo />
    <Text>Este é o conteúdo da modal ou painel lateral!</Text>
  </Column>
)
