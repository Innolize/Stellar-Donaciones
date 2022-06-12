import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Organization from '../pages/Organization';
import Profile from '../pages/Profile';
import Proyect from '../pages/Proyect';
import SignUp from '../pages/SignUp';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="profile" element={<Profile />} />
          <Route path="organizations/:id" element={<Organization />} />
          <Route path="proyects/:id" element={<Proyect />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
