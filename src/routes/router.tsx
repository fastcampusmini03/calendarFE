import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import MyPage from '../pages/MyPage'
import AdminPage from '../pages/AdminPage'
import UserListPage from '../pages/UserListPage'
import ErrorPage from '../pages/ErrorPage'
import ProtectedRouter from './ProtectedRouter'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route element={<ProtectedRouter />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route path="/admin/user" element={<UserListPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
