import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider
    use_fedcm_for_prompt={true}
    clientId={'915532211759-c7qrb92s3karo9mrppg7nfjsjs3g0bc7.apps.googleusercontent.com'}
  >
    <StrictMode>
        <App />
    </StrictMode>
  </GoogleOAuthProvider>
)
