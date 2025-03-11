import { Extension } from '@stack-spot/portal-extension-backend'
import { ViewPropsOf } from 'navigation'

export const Home = ({ route }: ViewPropsOf<'root'>) => {
    return <Extension slug="digital-store" pathToParent="/" />
}
