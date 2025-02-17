import { Button, IconBox, Text } from '@citric/core'
import { Cog, Heart, HeartFill, Puzzle, Table, Users } from '@citric/icons'
import { Badge, Card, IconButton } from '@citric/ui'
import { Link } from '@stack-spot/citron-navigator'
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

const icons: Record<Props['icon'], React.ReactNode> = {
  puzzle: <Puzzle />,
  table: <Table />,
  cog: <Cog />,
  users: <Users />,
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
  <StyledCard>
    <IconBox size="lg">{icons[icon]}</IconBox>
    <Text appearance="h4">{name}</Text>
    <Text>{description}</Text>
    <Text colorScheme="primary" weight="bold">NOVO</Text>
    <Link href={href}><Button>acessar produto</Button></Link>
    <div className="overlay">
      <Badge appearance="square" palette={tag === 'Maturidade' ? 'blue' : 'yellow'}>{tag}</Badge>
      <IconButton onClick={() => onChangeFavorite(!isFavorite)}>{isFavorite ? <HeartFill /> : <Heart />}</IconButton>
    </div>
  </StyledCard>
)
