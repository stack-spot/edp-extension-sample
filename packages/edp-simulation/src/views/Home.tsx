import { Extension } from '@stack-spot/portal-extension-backend'
import { ViewPropsOf } from 'navigation'

export const Home = ({ params: { extensionPath } }: ViewPropsOf<'root'>) => <Extension slug="" path={extensionPath} />
