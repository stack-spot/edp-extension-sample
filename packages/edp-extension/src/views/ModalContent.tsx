import { Flex, Text } from '@citric/core'
import { Logo } from '@stack-spot/portal-components/svg'

export const ModalContent = () => (
  <Flex flexDirection="column" alignItems="center" style={{ gap: '20px' }}>
    <Logo />
    <Text>Este é o conteúdo da modal ou painel lateral!</Text>
  </Flex>
)
