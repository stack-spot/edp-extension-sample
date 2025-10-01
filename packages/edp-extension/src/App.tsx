import { StackspotExtension } from '@stack-spot/portal-extension'
import { useContent } from './views/hook'
import { useMenu } from './menu/hook'
import { CitricProvider } from '@stack-spot/citric-react'
import { CitricController } from '@stack-spot/citric-react'
import { Link } from '@stack-spot/citron-navigator'

const citricController: CitricController = {
  renderLink: (props) => <Link {...props} />
}

export const App = () => {
  const content = useContent()
  useMenu()
  
  return (
    <StackspotExtension>
      <CitricProvider value={citricController}>
        {content}
      </CitricProvider>
    </StackspotExtension>
  )
}
