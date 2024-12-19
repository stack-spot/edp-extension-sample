import { ReactElement, useState } from 'react'
import { useNavigationContext } from '../generated/navigation'
import { Home } from './Home'
import { ModalContent } from './ModalContent'
import { ReusableComponent } from './ReusableComponent'

export function useContent() {
  const [content, setContent] = useState<ReactElement>(<></>)
  useNavigationContext((context) => {
    context
      .when('root', (props) => setContent(<Home {...props} />))
      .when('root.component', (props) => setContent(<ReusableComponent {...props} />))
      .when('root.modal', () => setContent(<ModalContent />))
      .whenNotFound(() => setContent(<h1>404: Not Found</h1>))
  })

  return content
}
