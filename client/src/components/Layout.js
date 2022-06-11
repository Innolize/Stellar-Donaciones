import { Container } from '@mui/system';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout = () => {
  return (
    <Container>
      <Navbar></Navbar>
      <Outlet />
    </Container>
  );
};

export default Layout;
