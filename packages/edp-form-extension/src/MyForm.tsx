/**
 * Attention: this is just an example, we didn't use any library to control our form. Feel free to use
 * the library of your choice or no library at all.
 */

import { cancel, contentClient, getData, submit, workspaceClient } from '@stack-spot/portal-extension'
import { Flex, Input, Select, Text, Option, Button } from '@citric/core'
import './App.css'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useTranslate } from '@stack-spot/portal-translate'
import { dictionary } from './dictionary'
import { onChangeData } from '@stack-spot/portal-extension'
import { Card, LoadingCircular } from '@citric/ui'
import { useCurrentPage } from '@stack-spot/portal-extension/dist/portal-data'

interface Field<T> {
  dirty?: boolean,
  error?: string,
  value?: T,
}

interface Form {
  name: Field<string>,
  document: Field<string>,
  gender: Field<'m' | 'f' | 'nb' | ''>,
  birth: Field<string>,
  phone: Field<string>,
  email: Field<string>,
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`

function validate(name: keyof Form, value: string) {
  // required
  if (['name', 'document', 'email'].includes(name) && !value) {
    return 'required'
  }
  // email validation
  if (name === 'email' && !value.match(/\w+@\w+/)) {
    return 'invalidEmail'
  }
}

export const MyForm = () => {
  const t = useTranslate(dictionary)
  const page = useCurrentPage()
  const [stack, isLoadingStack, stackError] = contentClient.getStackByVersionId.useStatefulQuery(
    { stackVersionId: page?.params.stackVersionId },
    { enabled: !!page?.params.stackVersionId },
  )
  const [workspace, isLoadingWorkspace, workspaceError] = workspaceClient.workspace.useStatefulQuery(
    { workspaceId: page?.params.workspaceId },
    { enabled: !!page?.params.workspaceId },
  )
  const [form, setForm] = useState<Form>({
    name: {},
    document: {},
    gender: {},
    birth: {},
    phone: {},
    email: {},
  })

  function updateForm(data: Record<string, any>) {
    setForm({
      name: { value: data.name },
      document: { value: data.document },
      gender: { value: data.gender },
      birth: { value: data.birth },
      phone: { value: data.phone },
      email: { value: data.email },
    })
  }

  useEffect(() => {
    updateForm(getData())
    return onChangeData(updateForm)
  }, [])

  function change(name: keyof Form) {
    return (e: React.ChangeEvent) => {
      console.log('changing')
      const value = 'value' in e.target ? e.target.value as string : ''
      const error = form[name].dirty ? validate(name, value) : undefined
      setForm({ ...form, [name]: { ...form[name], value, error }})
    }
  }

  function blur(name: keyof Form) {
    return (e: React.ChangeEvent) => {
      const value = 'value' in e.target ? e.target.value as string : ''
      const error = validate(name, value)
      setForm({ ...form, [name]: { dirty: true, value, error }})
    }
  }

  function validateAll() {
    const keys = Object.keys(form)
    const result: Record<string, Field<string>> = {}
    let isValid = true
    for (const key of keys) {
      const k = key as keyof Form
      const error = validate(k, form[k].value ?? '')
      if (error) isValid = false
      result[k] = { ...form[k], error, dirty: true }
    }
    setForm(result as unknown as Form)
    return isValid
  }

  function onSubmit() {
    if (validateAll()) {
      submit({
        name: form.name.value,
        document: form.document.value,
        gender: form.gender.value,
        birth: form.birth.value,
        phone: form.phone.value,
        email: form.email.value,
      })
    }
  }

  function getError(key: string) {
    return (t as Record<string, string>)[key] || key
  }

  return (
    <Flex flexDirection="column" style={{ gap: '16px' }}>
      <Text appearance="h2">Extension Form</Text>
      <Card>
        <Text appearance="h4">Stack</Text>
        {isLoadingStack && <Flex alignItems="center" justifyContent="center" p={6}><LoadingCircular /></Flex>}
        {stackError && <Text colorScheme="danger">Error while loading stack.</Text>}
        {stack && <>
          {stack.stack.imageUrl && <img src={stack.stack.imageUrl} width="32px" height="32px" />}
          <Text>Name: {stack.stack.displayName}</Text>
          <Text>Created at: {new Date(stack.stack.createdAt).toString()}</Text>
          <Text>Created by: {stack.stack.createdBy}</Text>
          <Text>Description: {stack.stack.description}</Text>
        </>}
      </Card>
      <Card>
        <Text appearance="h4">Workspace</Text>
        {isLoadingWorkspace && <Flex alignItems="center" justifyContent="center" p={6}><LoadingCircular /></Flex>}
        {workspaceError && <Text colorScheme="danger">Error while loading workspace.</Text>}
        {workspace && <>
          {workspace.imageUrl && <img src={workspace.imageUrl} width="32px" height="32px" />}
          <Text>Name: {workspace.name}</Text>
          <Text>Created at: {new Date(workspace.createdAt).toString()}</Text>
          <Text>Created by: {workspace.createdBy}</Text>
          <Text>Description: {workspace.description}</Text>
        </>}
      </Card>
      <Form>
        <div className="form-group">
          <label>
            <Text>Name:</Text>
            <Input value={form.name.value} onChange={change('name')} onBlur={blur('name')} />
          </label>
          {form.name.error && <Text colorScheme="danger">{getError(form.name.error)}</Text>}
        </div>

        <div className="form-group">
          <label>
            <Text>Document:</Text>
            <Input value={form.document.value} onChange={change('document')} onBlur={blur('document')} />
          </label>
          {form.document.error && <Text colorScheme="danger">{getError(form.document.error)}</Text>}
        </div>

        <Flex style={{ gap: '12px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>
              <Text>Gender:</Text>
              <Select value={form.gender.value} onChange={change('gender')}>
                <Option value="">{t['gender.empty']}</Option>
                <Option value="m">{t['gender.m']}</Option>
                <Option value="f">{t['gender.f']}</Option>
                <Option value="nb">{t['gender.nb']}</Option>
              </Select>
            </label>
            {form.gender.error && <Text colorScheme="danger">{getError(form.gender.error)}</Text>}
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>
              <Text>Birth date:</Text>
              <Input value={form.birth.value} onChange={change('birth')} onBlur={blur('birth')} type="date" />
            </label>
            {form.birth.error && <Text colorScheme="danger">{getError(form.birth.error)}</Text>}
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>
              <Text>Phone number:</Text>
              <Input value={form.phone.value} onChange={change('phone')} onBlur={blur('phone')} />
            </label>
            {form.phone.error && <Text colorScheme="danger">{getError(form.phone.error)}</Text>}
          </div>
        </Flex>

        <div className="form-group" style={{ flex: 1 }}>
          <label>
            <Text>Email:</Text>
            <Input value={form.email.value} onChange={change('email')} onBlur={blur('email')} type="email" />
          </label>
          {form.email.error && <Text colorScheme="danger">{getError(form.email.error)}</Text>}
        </div>

        <Flex justifyContent="space-between">
          <Button colorScheme="inverse" appearance="outlined" type="button" onClick={cancel}>{t.previous}</Button>
          <Button type="button" onClick={onSubmit}>{t.next}</Button>
        </Flex>
      </Form>
    </Flex>
  )
}
