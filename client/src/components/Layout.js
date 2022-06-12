import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
