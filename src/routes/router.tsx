
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/main";
import LoginForm from "../components/Calendar/Login";


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="*" element={<>notFound</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;