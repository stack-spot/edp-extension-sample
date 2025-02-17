import { ReactElement, useState } from 'react'
import { useNavigationContext } from '../generated/navigation'
import { Home } from './Home'

export function useContent() {
  const [content, setContent] = useState<ReactElement>(<></>)
  useNavigationContext((context) => {
    context
      .when('root', props => setContent(<Home {...props} />))
      .whenNotFound(() => setContent(<h1>404: Not Found</h1>))
  })

  return content
}
