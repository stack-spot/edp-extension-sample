import { Button, Flex, IconBox, Text } from '@citric/core'
import { Chart, Lock, User } from '@citric/icons'
import { getCurrentPage, getUserData, showModal } from '@stack-spot/portal-extension'
import { theme } from '@stack-spot/portal-theme'
import { root } from 'navigation'
import { useEffect, useState } from 'react'
import GaugeChart from 'react-gauge-chart'
import { styled } from 'styled-components'
import { AccessRequest, Responsible, getAccessRequestsByUserAndWorkspace, getHealth, getResponsible } from '../api'

interface WidgetData {
  responsible?: Responsible,
  accessRequests: AccessRequest[],
  health?: number,
}

const WidgetCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  gap: 20px;
  background-color: ${theme.color.light['500']};
  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      .icon {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .content {
        border-left: 2px solid ${theme.color.light[600]};
        padding: 8px 0 8px 20px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        button {
          margin: 0;
        }
      }
    }
  }
`

export const Widget = () => {
  const [data, setData] = useState<WidgetData | undefined>()
  const [error, setError] = useState<string>('')
  
  useEffect(() => {
    (async () => {
      try {
        const { workspaceId } = (await getCurrentPage()).params ?? {}
        const { email } = await getUserData()
        if (!workspaceId) return setError('This widget must be rendered in the context of a workspace')
        const responsible = getResponsible(workspaceId)
        const accessRequests = getAccessRequestsByUserAndWorkspace(email, workspaceId)
        const health = getHealth(workspaceId)
        setData({ responsible, accessRequests, health })
      } catch (error: any) {
        setError(error.message ?? `${error}`)
      }
    })()
  }, [])

  return (
    <WidgetCard>
      <img src="/public/itau.png" width={64} height={64} alt="Itaú" />
      {error ? <Text colorScheme="danger">{error}</Text> : <ul>
        <li>
          <div className="icon">
            <IconBox size="lg"><User /></IconBox>
            <Text appearance="body2" weight="bold">Responsável</Text>
          </div>
          <div className="content">
            {data?.responsible ? (
              <>
                <Text appearance="body2">{data.responsible.name}</Text>
                <Text appearance="body2">{data.responsible.email}</Text>
                <Text appearance="body2">{data.responsible.phone}</Text>
              </>
            ) : <Text appearance="body2">Desconhecido</Text>}
          </div>
        </li>
        <li>
          <div className="icon">
            <IconBox size="lg"><Chart /></IconBox>
            <Text appearance="body2" weight="bold">Saúde</Text>
          </div>
          <div className="content" style={{ alignItems: 'center' }}>
            {data?.health ? (
              <>
                <GaugeChart
                  id="gauge-health"
                  percent={data.health}
                  colors={[theme.color.moss[500], theme.color.orange[500], theme.color.red[500]]}
                  style={{ width: '120px' }}
                  hideText
                />
                <Text appearance="body2">{data.health * 100}%</Text>
              </>
            ) : <Text appearance="body2">Desconhecido</Text>}
          </div>
        </li>
        <li>
          <div className="icon">
            <IconBox size="lg"><Lock /></IconBox>
            <Text appearance="body2" weight="bold">Acessos</Text>
          </div>
          <div className="content">
            <Flex flexDirection="column" style={{ gap: '5px' }}>
              <Button
                size="sm"
                onClick={() => showModal({
                  title: 'Pedir acesso',
                  subtitle: 'Abra um ticket para o suporte',
                  path: root.requestAccess.$link(),
                })}
              >
                Pedir acesso
              </Button>
              <Button
                size="sm"
                onClick={() => showModal({
                  title: 'Meus tickets',
                  subtitle: 'Veja seus pedidos de acesso',
                  path: root.accessRequests.$link(),
                })}
              >
                Ver pedidos
              </Button>
            </Flex>
          </div>
        </li>
      </ul>}
    </WidgetCard>
  )
}
