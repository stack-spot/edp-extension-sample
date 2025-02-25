import { contentClient } from '@stack-spot/portal-extension'
import { AsyncContent } from 'components/AsyncContent'

export const StudiosList = () => {
  const [studios, isLoading, error] = contentClient.studios.useStatefulQuery({})

  return (
    <AsyncContent loading={isLoading} error={error}>
      <ul>{studios?.map(s => <li key={s.id}>{s.name}</li>)}</ul>
    </AsyncContent>
  )
}
