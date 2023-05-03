
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/main";


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="*" element={<>notFound</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;