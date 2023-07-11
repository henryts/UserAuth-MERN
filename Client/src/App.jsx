import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import ProfilePage from "./Pages/profile/Profile";
import AdminHome from "./Pages/AdminHome/AdminHome";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import ViewUsers from "./Pages/ViewUsers/ViewUsers";

function App() {
  const token=localStorage.getItem('token')
  const adminToken=localStorage.getItem('adminToken')
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile" element={token?<ProfilePage/>:<Navigate to='/'/>}/>

          <Route path="/admin" element={adminToken?<AdminHome/>:<Navigate to='/admin/login'/>}/>
          <Route path="/admin/login" element={<AdminLogin/>}/>
          <Route path="/admin/view-users" element={adminToken?<ViewUsers/>:<Navigate to='/admin/login' />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
