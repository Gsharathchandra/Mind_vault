import DashBoard from "./pages/DashBoard";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { SharedBrain } from "./pages/SharedBrain";



function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/share/:shareLink" element={<SharedBrain />} />
      <Route path="/" element={<DashBoard />} />


    </Routes>
  </BrowserRouter>



}

export default App