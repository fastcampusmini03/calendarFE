import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from '../pages/main'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import MyPage from '../pages/MyPage'
import AdminPage from '../pages/AdminPage'
import UserListPage from '../pages/UserListPage'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
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
