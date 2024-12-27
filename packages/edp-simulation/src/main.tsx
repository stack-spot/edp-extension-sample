// import { Authenticated } from '@stack-spot/auth-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Authenticated> */}
    <App />
    {/* </Authenticated> */}
  </React.StrictMode>,
)
