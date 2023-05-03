import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from '../pages/main'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'

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
