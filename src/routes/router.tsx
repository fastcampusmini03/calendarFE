import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from '../pages/main'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<>notFound</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
