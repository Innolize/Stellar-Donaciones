import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Proyect from '../pages/Proyect';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/proyects/:id" element={<Proyect />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
