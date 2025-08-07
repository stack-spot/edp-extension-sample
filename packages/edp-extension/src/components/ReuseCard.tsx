import { Text, Badge, Card, CitricComponent } from '@stack-spot/citric-react'
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
  gap: 20px;
  align-items: center;
  text-align: center;
  flex: 1;
  justify-content: space-between;
`

export const ReuseCard = ({ description, href, name, requires }: Props) => (
  <StyledCard bgLevel={400}>
    <Badge appearance="square" colorPalette="pink">Produção</Badge>
    <Text appearance="h4">{name}</Text>
    <Text color="light.700" weight="bold">{requires.join(', ')}</Text>
    <Text>{description}</Text>
    <CitricComponent render={Link} component="button" href={href}>abrir componente</CitricComponent>
  </StyledCard>
)
