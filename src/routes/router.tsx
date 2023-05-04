import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from '../pages/main'
import SignupPage from '../pages/signupPage'
import LoginPage from '../pages/LoginPage'
import MyPage from '../pages/MyPage'
import LoginForm from '../components/Calendar/Login'


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<LoginForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<>notFound</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
