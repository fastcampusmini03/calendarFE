import React from 'react'
import LoginPage from '../pages/LoginPage'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<mainPage}/> */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
