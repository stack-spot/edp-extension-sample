import { IconBox, Text } from '@citric/core'
import { Dislike, LikeFill } from '@citric/icons'
import { Badge, Card, Tabs, TabsItem } from '@citric/ui'
import { Link } from '@stack-spot/citron-navigator'
import { theme } from '@stack-spot/portal-theme'
import { ViewPropsOf } from 'navigation'
import { useState } from 'react'
import { styled } from 'styled-components'
import reuse from '../mock/reuse.json'

const Styled = styled.div`
  header {
    display: flex;
    flex-direction: column;
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
      background-color: ${theme.color.light[500]};
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
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Styled>
      <Card as="header">
        <Text appearance="h2" colorScheme="primary">{component?.name}</Text>
        <Badge palette="pink" appearance="square" className="badge">Production</Badge>
        <div className="footer">
          <Text><b>Implementação requer: </b>{component?.requires.join(', ')}</Text>
          <div className="reuse">
            <Text weight="bold">Faz reúso da solução?</Text>
            <IconBox><LikeFill /></IconBox>
            <IconBox><Dislike /></IconBox>
          </div>
        </div>
        <Card className="related">
          <Text weight="bold">Produtos relacionados:</Text>
          <ul>
            {component?.related.map(id => <li key={id}><Link to={route} params={{ id }}>{reuse.find((r) => r.id === id)?.name}</Link></li>)}
          </ul>
        </Card>
      </Card>
      <Tabs activeIndex={activeTab} onChange={setActiveTab}>
        <TabsItem title="Informações gerais">
          Informações gerais do componente.
        </TabsItem>
        <TabsItem title="Cenários de aplicação">
          Cenários de aplicação do componente.
        </TabsItem>
        <TabsItem title="Contato">
          Dados para contato com os mantenedores do componente.
        </TabsItem>
      </Tabs>
    </Styled>
  )
}
