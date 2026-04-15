import Navbar from './components/Navbar'
import Main from './components/Main'
import AuthPage from './pages/AuthPage/AuthPage'
import ForgotCredentialsPage from './pages/ForgotCredentialsPage/ForgotCredentialsPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './styles.css'


import { UserProvider } from './context/userContext'

function App() {

  return (
      <UserProvider>
        <div className="background">

          <BrowserRouter>
            <Navbar />

            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/forgot-credentials" element={<ForgotCredentialsPage /> } />
              <Route path="/reset-password/:token" element={<ForgotCredentialsPage /> } />
            </Routes>

          </BrowserRouter>
        </div>
      </UserProvider>

  )
}

export default App
