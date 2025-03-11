import { Extension as ExtensionIcon } from '@citric/icons'
import { Layout } from '@stack-spot/portal-layout'
import { loadTheme } from '@stack-spot/portal-theme/dist/definition'
import { useEffect } from 'react'
import './App.css'
import { useHeader } from './header'
import { useContent } from './views/hook'
import { extensionRegister } from '@stack-spot/portal-extension-backend'

export const App = () => {
  const header = useHeader()
  const content = useContent()
  useEffect(loadTheme, [])

  useEffect(() => {
    extensionRegister.register({
      displayName: {
        pt: 'Loja Digital',
        en: 'Digital Store',
      },
      slug: 'digital-store',
      url: 'http://localhost:3001',
    })
  }, [])
  
  return (
    <Layout header={header} menu={{ sections: [{ label: 'Extension', active: true, icon: <ExtensionIcon /> }] }}>
      {content}
    </Layout>
  )
}
