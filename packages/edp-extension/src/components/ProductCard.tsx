import { IconBox, Text, Badge, Card, IconButton, CitricComponent } from '@stack-spot/citric-react'
import { Link } from '@stack-spot/citron-navigator'
import { capitalize } from 'lodash'
import { styled } from 'styled-components'

interface Props {
  tag: 'Maturidade' | 'Introduction',
  icon: 'puzzle' | 'table' | 'cog' | 'users',
  name: string,
  description: string,
  href: string,
  isFavorite: boolean,
  onChangeFavorite: (value: boolean) => void,
}

const StyledCard = styled(Card)`
  position: relative;
  gap: 20px;
  align-items: center;
  text-align: center;
  flex: 1;
  justify-content: space-between;
  .overlay {
    position: absolute;
    display: flex;
    justify-content: space-between;
    padding: 8px;
    left: 0;
    right: 0;
    top: 0;
  }
`

export const ProductCard = ({ tag, description, href, icon, name, isFavorite, onChangeFavorite }: Props) => (
  <StyledCard bgLevel={400}>
    <IconBox icon={capitalize(icon)} size="lg" />
    <Text appearance="h4">{name}</Text>
    <Text>{description}</Text>
    <Text color="primary.500" weight="bold">NOVO</Text>
    <CitricComponent render={Link} component="button" href={href}>acessar produto</CitricComponent>
    <div className="overlay">
      <Badge appearance="square" colorPalette={tag === 'Maturidade' ? 'blue' : 'yellow'}>{tag}</Badge>
      <IconButton
        group={isFavorite ? 'fill' : 'outline'}
        icon={isFavorite ? 'HeartFill' : 'Heart'}
        onClick={() => onChangeFavorite(!isFavorite)}
      />
    </div>
  </StyledCard>
)
