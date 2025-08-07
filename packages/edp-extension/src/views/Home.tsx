import { Button, Row, Text } from '@stack-spot/citric-react'
import { alert, confirm, showModal, showRightPanel, showToaster } from '@stack-spot/portal-extension'
import { ProductCard } from 'components/ProductCard'
import { ReuseCard } from 'components/ReuseCard'
import { StudiosList } from 'containers/StudiosList'
import { root, ViewPropsOf } from 'navigation'
import { styled } from 'styled-components'
import products from '../mock/products.json'
import reuse from '../mock/reuse.json'

const Styled = styled.div`
  h3 {
    margin: 40px 0;
  }
  .card-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: stretch;

    li {
      flex: 1;
      display: flex;
    }
  }
`

export const Home = ({ route }: ViewPropsOf<'root'>) => (
  <Styled>
    <Text appearance="h2" color="primary.500">Lançamento App Store</Text>
    <Text appearance="h3">Produtos</Text>
    <ul className="card-list">
      {products.map(p => (
        <li key={p.id}>
          <ProductCard
            tag={p.tag as any}
            description={p.description}
            name={p.name}
            href="#"
            icon={p.icon as any}
            isFavorite={p.favorite}
            onChangeFavorite={() => {}}
          />
        </li>
      ))}
    </ul>
    <Row justifyContent="space-between">
      <Text appearance="h3">Componentes para reúso</Text>
      <Button appearance="outlined" colorScheme="inverse">abrir biblioteca</Button>
    </Row>
    <ul className="card-list">
      {reuse.map(r => (
        <li key={r.id}>
          <ReuseCard
            description={r.description}
            name={r.name}
            requires={r.requires}
            href={route.component.$link({ id: r.id })}
          />
        </li>
      ))}
    </ul>
    <Text appearance="h3">Exemplos de interações com overlays</Text>
    <Row gap="10px">
      <Button
        colorScheme="inverse"
        onClick={() => showModal({
          title: 'Minha modal',
          subtitle: 'Este é um exemplo de modal',
          path: root.modal.$link(),
        })}
      >
        Abrir uma modal
      </Button>
      <Button
        colorScheme="inverse"
        onClick={() => showRightPanel({
          title: 'Meu painel',
          subtitle: 'Este é um exemplo de painel',
          path: root.modal.$link(),
        })}
      >
        Abrir o painel lateral
      </Button>
      <Button
        colorScheme="inverse"
        onClick={() => showToaster({
          message: 'Hello World',
          type: 'success',
        })}
      >
        Abrir um toaster
      </Button>
      <Button
        colorScheme="inverse"
        onClick={() => alert({
          title: 'Alerta',
          subtitle: 'Isso é um alerta!',
        })}
      >
        Abrir um alerta
      </Button>
      <Button
        colorScheme="inverse"
        onClick={async () => {
          const answer = await confirm({
            title: 'Confirm',
            subtitle: 'Isso é uma confirmação',
          })
          // eslint-disable-next-line no-console
          console.log(answer ? 'confirmado' : 'cancelado')
        }}
      >
        Abrir uma confirmação
      </Button>
    </Row>
    <Text appearance="h3">Exemplo de chamada de rede: listagem de studios</Text>
    {/* The following component will render an error if the extension is not loaded from inside the real EDP Portal.
    To run the extension inside the EDP Portal, use `pnpm preview` in a terminal window. */}
    <StudiosList />
  </Styled>
)
