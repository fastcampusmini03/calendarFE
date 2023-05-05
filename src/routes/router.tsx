import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import SignupPage from '../pages/signupPage'
import LoginPage from '../pages/LoginPage'
import MyPage from '../pages/MyPage'
import AdminPage from '../pages/AdminPage'
import UserListPage from '../pages/UserListPage'
import LoginForm from '../components/Calendar/Login'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<LoginForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/user" element={<UserListPage />} />
        <Route path="*" element={<>notFound</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
