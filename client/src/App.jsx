import Navbar from './components/Navbar'
import Main from './components/Main'
import AuthPage from './pages/AuthPage/AuthPage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import ForgotCredentialsPage from './pages/ForgotCredentialsPage/ForgotCredentialsPage'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import './styles.css'
import { useContext } from 'react'
import { UserContext } from './context/userContext'


import { UserProvider } from './context/userContext'

  // shared background wrapper
  const SharedLayout = () => {
    const { theme } = useContext(UserContext)

    return (
      <div className={`app-wrapper ${theme ? 'fireplace' : 'default-background'}`}>
        <Navbar />

          <Outlet /> {/* main */}

      </div>
    )
  }

  // default wrapper for any other elements, inherits from global base style
  const DefaultLayout = () => {
    return (
      <div className="app-wrapper default-background">
        <Navbar />
        <Outlet />
      </div>
    )
  }

function App() {

  return (
      <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<SharedLayout />} >
                <Route path="/" element={<Main />} />
              </Route>
              
              <Route element={<DefaultLayout />} >
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/forgot-credentials" element={<ForgotCredentialsPage /> } />
                <Route path="/reset-password/:token" element={<ForgotCredentialsPage /> } />
              </Route>
            </Routes>

          </BrowserRouter>


      </UserProvider>

  )
}

export default App
