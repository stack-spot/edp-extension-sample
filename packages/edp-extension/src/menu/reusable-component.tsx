import { MenuSectionContent } from '@stack-spot/portal-extension'
import { ViewPropsOf } from 'navigation'

export function createReusableComponentMenu({ route, params: { id } }: ViewPropsOf<'root.component'>): MenuSectionContent {
  return {
    goBack: {
      label: 'Voltar',
      href: route.$parent.$link(),
    },
    pageSelector: {
      value: id,
      options: [
        { key: '1', label: 'Taskbot AA', href: route.$link({ id: '1' }) },
        { key: '2', label: 'Gestão de e-mail', href: route.$link({ id: '2' }) },
        { key: '3', label: 'Messageria Email e SMS', href: route.$link({ id: '3' }) },
        { key: '4', label: 'Orquestrador de Tickets', href: route.$link({ id: '4' }) },
      ]
    },
    options: [
      { label: 'Dashboard', active: true },
      { label: 'Menu de teste' },
    ]
  }
}
