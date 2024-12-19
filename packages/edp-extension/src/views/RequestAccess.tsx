import { Button, Flex, Label, Option, Select, Text, Textarea } from '@citric/core'
import { closeModal, getCurrentPage, getUserData, showToaster } from '@stack-spot/portal-extension'
import { useTranslate } from '@stack-spot/portal-translate'
import { useState } from 'react'
import { styled } from 'styled-components'
import { AccessRequestType, accessRequestType, saveAccessRequest } from '../api'
import { dictionary } from '../dictionary'

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
`

export const RequestAccess = () => {
  const t = useTranslate(dictionary)
  const [type, setType] = useState<AccessRequestType>('read-git-repo')
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { workspaceId } = (await getCurrentPage()).params ?? {}
    const { email } = await getUserData()
    if (!workspaceId) return setError('This must be called in the context of a workspace')
    saveAccessRequest({ owner: email, type, reason, workspaceId })
    showToaster({ type: 'success', message: 'Acesso solicitado!' })
    closeModal()
  }

  return (
    <form onSubmit={onSubmit}>
      {error && <Text colorScheme="danger">{error}</Text>}
      <FieldGroup>
        <Label>Tipo</Label>
        <Select value={type} onChange={e => setType(e.target.value as AccessRequestType)}>
          {accessRequestType.map(value => <Option key={value} value={value}>{t[value]}</Option>)}
        </Select>
      </FieldGroup>
      <FieldGroup>
        <Label>Motivo</Label>
        <Textarea value={reason} onChange={e => setReason(e.target.value)} />
      </FieldGroup>
      <Flex flexDirection="row" style={{ gap: '5px' }} mt={5}>
        <Button colorScheme="primary" type="submit">Requisitar acesso</Button>
        <Button appearance="outlined" colorScheme="inverse" type="button" onClick={closeModal}>Fechar</Button>
      </Flex>
    </form>
  )
}
