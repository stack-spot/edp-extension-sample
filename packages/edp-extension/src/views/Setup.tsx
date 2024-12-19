import { Button, Flex, Input, Label, Text } from '@citric/core'
import { getCurrentPage, showToaster } from '@stack-spot/portal-extension'
import { useState } from 'react'
import { styled } from 'styled-components'
import { setResponsible, setHealth as setWorkspaceHealth } from '../api'

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
`

export const Setup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [health, setHealth] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { workspaceId } = (await getCurrentPage()).params ?? {}
    if (!workspaceId) return setError('This must be called in the context of a workspace')
    setResponsible(workspaceId, { name, email, phone })
    setWorkspaceHealth(workspaceId, parseFloat(health) / 100)
    showToaster({ type: 'success', message: 'Extension setup completed!' })
  }

  return (
    <>
      <Text appearance="h4" mb={8}>Itaú extra: setup</Text>
      <form onSubmit={onSubmit}>
        {error && <Text colorScheme="danger">{error}</Text>}
        <Text appearance="h5" mb={4}>Responsável</Text>
        <FieldGroup>
          <Label>Nome</Label>
          <Input value={name} onChange={e => setName(e.target.value)}  />
        </FieldGroup>
        <FieldGroup>
          <Label>E-mail</Label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)}  />
        </FieldGroup>
        <FieldGroup>
          <Label>Telefone</Label>
          <Input value={phone} onChange={e => setPhone(e.target.value)}  />
        </FieldGroup>
        <Text appearance="h5" mb={4}>Saúde</Text>
        <FieldGroup>
          <Label>Taxa de sucesso (0-100%)</Label>
          <Input type="number" min="0" max="100" value={health} onChange={e => setHealth(e.target.value)}  />
        </FieldGroup>
        <Flex justifyContent="end" mt={5}>
          <Button colorScheme="primary" type="submit">Salvar</Button>
        </Flex>
      </form>
    </>
  )
}
