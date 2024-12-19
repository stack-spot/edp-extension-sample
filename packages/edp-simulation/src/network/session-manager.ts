import { SessionManager } from '@stack-spot/auth-react'
import { ACCOUNT_URL, STACKSPOT_IAM_URL } from 'env'

export const sessionManager = SessionManager.create({
  accountUrl: ACCOUNT_URL,
  authUrl: STACKSPOT_IAM_URL,
  clientId: 'stackspot-portal',
  defaultTenant: 'stackspot-freemium',
})
