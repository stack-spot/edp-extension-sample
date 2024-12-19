import { Text } from '@citric/core'
import { getCurrentPage, getUserData } from '@stack-spot/portal-extension'
import { theme } from '@stack-spot/portal-theme'
import { useTranslate } from '@stack-spot/portal-translate'
import { useEffect, useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { AccessRequest, getAccessRequestsByUserAndWorkspace } from '../api'
import { dictionary } from '../dictionary'

const RequestList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  li {
    border-radius: 12px;
    background-color: ${theme.color.light[500]};
    border: 1px solid ${theme.color.light[600]};
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`

export const AccessRequests = () => {
  const t = useTranslate(dictionary)
  const [requests, setRequests] = useState<AccessRequest[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      const { workspaceId } = (await getCurrentPage()).params ?? {}
      const { email } = await getUserData()
      if (!workspaceId) return setError('This must be called in the context of a workspace')
      setRequests(getAccessRequestsByUserAndWorkspace(email, workspaceId))
    })()
  }, [])

  const requestItems = useMemo(() => requests.map((r) => (
    <li key={r.id}>
      <Text><span style={{ fontWeight: 'bold' }}>Tipo: </span>{t[r.type]}</Text>
      <Text><span style={{ fontWeight: 'bold' }}>Motivo: </span>{r.reason}</Text>
    </li>
  )), [requests])

  if (error) return <Text colorScheme="danger">{error}</Text>
  if (requests.length) return <RequestList>{requestItems}</RequestList>
  return <Text>Você não possui requisições de acesso abertas.</Text>
}
