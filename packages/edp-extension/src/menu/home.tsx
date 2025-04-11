import { MenuSectionContent } from '@stack-spot/portal-extension'
import { root } from 'navigation'

export const homeMenu: MenuSectionContent = {
  options: [
    {
      label: 'Loja Digital',
      children: [
        { label: 'Home', href: root.$link(), active: true },
        { label: 'Valida Cancelamento', href: root.component.$link({ id: '1' }) },
        { label: 'Gestão de e-mail', href: root.component.$link({ id: '2' }) },
      ]
    },
    {
      label: 'Links Externos',
      open: false,
      children: [
        { label: 'Stackspot', href: 'https://www.stackspot.com', target: '_blank' },
        { label: 'Zup', href: 'https://www.zup.com.br', target: '_blank' },
        { label: 'Google', href: 'https://www.google.com', target: '_blank' },
        { label: 'Microsoft', href: 'https://www.microsoft.com' },
        { label: 'Apple', href: 'https://www.apple.com' },
      ]
    },
  ]
}