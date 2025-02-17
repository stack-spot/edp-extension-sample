import { Colors, Globe } from '@citric/icons'
import { HeaderProps } from '@stack-spot/portal-layout'
import { setTheme, useThemeName } from '@stack-spot/portal-theme'
import { Dictionary, setLanguage, useLanguage, useTranslate } from '@stack-spot/portal-translate'

export function useHeader(): HeaderProps {
  const t = useTranslate(dictionary)
  const theme = useThemeName()
  const language = useLanguage()

  return {
    userName: 'mock',
    email: 'user@mock.com',
    logoHref: '/',
    options: [
      {
        type: 'section',
        children: [
          {
            label: t.appearance,
            icon: <Colors />,
            children: [
              { label: t.dark, onClick: () => setTheme('dark'), active: theme === 'dark' },
              { label: t.light, onClick: () => setTheme('light'), active: theme === 'light' },
            ],
          },
          {
            label: t.language,
            icon: <Globe />,
            children: [
              { label: 'English - US', onClick: () => setLanguage('en'), active: language === 'en' },
              { label: 'Português - BR', onClick: () => setLanguage('pt'), active: language === 'pt' },
            ],
          },
        ],
      },
    ],
  }
}

const dictionary = {
  en: {
    appearance: 'Appearance',
    language: 'Language',
    dark: 'Dark Mode',
    light: 'Light Mode',
    signOut: 'Sign out',
  },
  pt: {
    appearance: 'Aparência',
    language: 'Idioma',
    dark: 'Tema Escuro',
    light: 'Tema Claro',
    signOut: 'Sair',
  },
} satisfies Dictionary
