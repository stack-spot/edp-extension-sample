import { StackspotExtension } from '@stack-spot/portal-extension'
import './App.css'
import { useContent } from './views/hook'
import { useMenu } from './menu/hook'

export const App = () => {
  const content = useContent()
  useMenu()
  
  return (
    <StackspotExtension>
      {content}
    </StackspotExtension>
  )
}
