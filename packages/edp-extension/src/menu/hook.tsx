import { showMenu } from '@stack-spot/portal-extension'
import { useNavigationContext } from '../generated/navigation'
import { homeMenu } from './home'
import { createReusableComponentMenu } from './reusable-component'

export function useMenu() {
  useNavigationContext((context) => {
    context
      .when('root', () => showMenu(homeMenu))
      .when('root.component', (props) => showMenu(createReusableComponentMenu(props)))
  })
}
