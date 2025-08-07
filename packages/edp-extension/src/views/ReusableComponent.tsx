import { Text, Badge, Card, Tabs, Tab, Link } from '@stack-spot/citric-react'
import { ViewPropsOf } from 'navigation'
import { useMemo } from 'react'
import { styled } from 'styled-components'
import reuse from '../mock/reuse.json'
import { Icon } from '@stack-spot/citric-icons'

const Styled = styled.div`
  header {
    gap: 16px;
    position: relative;
    margin-bottom: 30px;
    .badge {
      align-self: flex-start;
    }
    .footer {
      display: flex;
      gap: 30px;
      align-items: center;
      .reuse {
        display: flex;
        gap: 16px;
        align-items: center;
      }
    }
    .related {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      margin: 20px;
      width: 250px;
      ul {
        padding: 0;
        margin: 20px 0 0 0;
        list-style: none;
      }
    }
  }
`

export const ReusableComponent = ({ params: { id }, route }: ViewPropsOf<'root.component'>) => {
  const component = reuse.find(r => r.id === id)

  const tabs: Tab<'general' | 'app' | 'contact'>[] = useMemo(() => [
    { key: 'general', label: 'Informações gerais', content: 'Informações gerais do componente.' },
    { key: 'app', label: 'Cenários de aplicação', content: 'Cenários de aplicação do componente.' },
    { key: 'contact', label: 'Contato', content: 'Dados para contato com os mantenedores do componente.' },
  ], [])

  return (
    <Styled>
      <Card tag="header" bgLevel={400}>
        <Text appearance="h2" color="primary.500">{component?.name}</Text>
        <Badge colorPalette="pink" appearance="square" className="badge">Production</Badge>
        <div className="footer">
          <Text><b>Implementação requer: </b>{component?.requires.join(', ')}</Text>
          <div className="reuse">
            <Text weight="bold">Faz reúso da solução?</Text>
            <Icon group="fill" icon="LikeFill" />
            <Icon icon="Dislike" />
          </div>
        </div>
        <Card className="related" bgLevel={500}>
          <Text weight="bold">Produtos relacionados:</Text>
          <ul>
            {component?.related.map(id => (
              <li key={id}>
                <Link href={route.$link({ id })}>
                  {reuse.find((r) => r.id === id)?.name}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </Card>
      <Tabs tabs={tabs} />
    </Styled>
  )
}
