import { StackspotExtension } from '@stack-spot/portal-extension'
import './App.css'
import { useContent } from './views/hook'

export const App = () => {
  const content = useContent()

  return (
    <StackspotExtension>
      {content}
    </StackspotExtension>
  )
}
