import { Extension as ExtensionIcon } from '@citric/icons'
import { ExtensionsProvider } from '@stack-spot/portal-extension-backend'
import { Layout } from '@stack-spot/portal-layout'
import { loadTheme } from '@stack-spot/portal-theme/dist/definition'
import { useEffect } from 'react'
import './App.css'
import { useHeader } from './header'
import { useContent } from './views/hook'

export const App = () => {
  const header = useHeader()
  const content = useContent()
  useEffect(loadTheme, [])
  
  return (
    <ExtensionsProvider url="http://localhost:3001">
      <Layout header={header} menu={{ sections: [{ label: 'Extension', active: true, icon: <ExtensionIcon /> }] }}>
        {content}
      </Layout>
    </ExtensionsProvider>
  )
}
