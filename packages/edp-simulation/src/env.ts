// Checks if all env variables are available

const envVars = ['ACCOUNT_URL', 'STACKSPOT_IAM_URL']
const invalidEnvVars = envVars.reduce<string[]>(
  (result, name) => import.meta.env[`VITE_APP_${name}`] ? result : [...result, `VITE_APP_${name}`],
  [],
)
if (invalidEnvVars.length) {
  throw new Error(
    `Invalid set of environment variables. Please make sure you declared the following variables: ${invalidEnvVars.join(', ')}.`,
  )
}

// Exports the env variables

export const ACCOUNT_URL = import.meta.env.VITE_APP_ACCOUNT_URL ?? ''
export const STACKSPOT_IAM_URL = import.meta.env.VITE_APP_STACKSPOT_IAM_URL ?? ''
