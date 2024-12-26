import { SessionManager } from '@stack-spot/auth-react'
import { NetworkClient } from '@stack-spot/portal-network'
import { ACCOUNT_URL, MODE, STACKSPOT_IAM_URL } from 'env'

export const sessionManager = SessionManager.create({
  accountUrl: ACCOUNT_URL,
  authUrl: STACKSPOT_IAM_URL,
  clientId: 'stackspot-portal',
  defaultTenant: 'stackspot-freemium',
})

function modeToEnv() {
  switch (MODE) {
    case 'development': return 'dev'
    case 'test': return 'dev'
    case 'staging': return 'stg'
    default: return 'prd'
  }
}

NetworkClient.setup(sessionManager, modeToEnv())
