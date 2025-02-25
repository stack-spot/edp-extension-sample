import { Button, Text } from '@citric/core'
import { Badge, Card } from '@citric/ui'
import { Link } from '@stack-spot/citron-navigator'
import { styled } from 'styled-components'

interface Props {
  name: string,
  requires: string[],
  description: string,
  href: string,
}

const StyledCard = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  text-align: center;
  flex: 1;
  justify-content: space-between;
`

export const ReuseCard = ({ description, href, name, requires }: Props) => (
  <StyledCard>
    <Badge appearance="square" palette="pink">Produção</Badge>
    <Text appearance="h4">{name}</Text>
    <Text colorScheme="light.700" weight="bold">{requires.join(', ')}</Text>
    <Text>{description}</Text>
    <Link href={href}><Button>abrir componente</Button></Link>
  </StyledCard>
)
