import { useContext } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import { UserContext } from '../context/UserProvider';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Organization from '../pages/Organization';
import Profile from '../pages/Profile';
import Proyect from '../pages/Proyect';
import SignUp from '../pages/SignUp';

function RequireAuth() {
  let { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route element={<RequireAuth />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="organizations/:id" element={<Organization />} />
          <Route path="proyects/:id" element={<Proyect />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
