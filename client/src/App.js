/*import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute";
import Loader from "./components/loader";
import { useSelector } from "react-redux";
import Profile from "./pages/profile";

function App() {
  const { loader } = useSelector(state => state.loaderReducer);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      { loader && <Loader /> }
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute> }>
          </Route>
          <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute> }>
          </Route>
          <Route path="/login" element={<Login /> }></Route>
          <Route path="/signup" element={<Signup /> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup/index';
import SendOtp from './pages/signup/SendOtp';
import VerifyOtpNew from './pages/signup/Otp';
import ResetPassword from './pages/login/forgetPassword';

import Verify from './pages/login/verify';


import SendOtplogin from './pages/login/send';

import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute";
import Loader from "./components/loader";
import { useSelector } from "react-redux";
import Profile from "./pages/profile";

//import Security from "./pages/profile/security";
import ProfilePic from "./pages/profile/profilepicture";
import AdminLogin from "./pages/home/admin/AdminLogin";
import Dashboard from "./pages/home/admin/Dashboard";
import UserManagement from "./pages/home/admin/UserManagement";
import ChatManagement from "./pages/home/admin/ChatManagement";
import MessageManagement from "./pages/home/admin/MessageManagement";
import store from "./redux/store";
import { Provider } from 'react-redux';



function App() {
  const { loader } = useSelector(state => state.loaderReducer);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      { loader && <Loader /> }
      
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute> }>
          </Route>

       {/*   <Route path="/ChangePassword" element={
              <ProtectedRoute>
                <ResetPassword />
               </ProtectedRoute> }>

            </Route>
            */}
        

         
          <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute> }>
          </Route>

          <Route path="/profilepicture" element={
              <ProtectedRoute>
                <ProfilePic />
              </ProtectedRoute> }>
          </Route>

          
          <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute> }>
          </Route>
          
          


          <Route path="/login" element={<Login /> }></Route>
          <Route path="/signup" element={<Signup /> }></Route>
          <Route path="/SendOtp" element={<SendOtp /> }></Route>
          <Route path="/ChangePassword" element={<ResetPassword />}></Route>

          <Route path="/Otp" element={<VerifyOtpNew /> }></Route>
          

           <Route path="/verify" element={<Verify /> }></Route>
            
           
           <Route path="/send" element={<SendOtplogin /> }></Route>

          <Route path="/admin" element={<AdminLogin /> }></Route>
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />

        </Routes>
        </BrowserRouter>
        </Provider>
     
    </div>
  );
}

export default App;
