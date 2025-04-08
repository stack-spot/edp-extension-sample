import { Extension as ExtensionIcon } from '@citric/icons'
import { Layout } from '@stack-spot/portal-layout'
import { Link } from '@stack-spot/citron-navigator'
import { AnchorProvider } from '@stack-spot/portal-components/anchor'
import { loadTheme } from '@stack-spot/portal-theme'
import { useEffect } from 'react'
import './App.css'
import { useHeader } from './header'
import { useContent } from './views/hook'
import { extensionRegister, useExtensionMenu } from '@stack-spot/portal-extension-backend'

export const App = () => {
  const header = useHeader()
  const content = useContent()
  const menu = useExtensionMenu()
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
    <AnchorProvider anchorTag={Link}>
      <Layout header={header} menu={{ sections: [{ label: 'Extension', active: true, icon: <ExtensionIcon /> }], content: menu }}>
        {content}
      </Layout>
    </AnchorProvider>
  )
}
