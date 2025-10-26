import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import AboutPage from '@/pages/AboutPage'
import ForumPage from '@/pages/ForumPage'
import ProfilePage from '@/pages/ProfilePage'

const ProtectedRoute = () => {
  const auth = useAuth()

  if (auth.accessToken === null) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/profile" element={<ProtectedRoute />} >
              <Route path="" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
