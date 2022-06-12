import { Box, Button, Divider, Grid } from '@mui/material';
import { Fragment, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import DonationModal from '../components/DonationModal';
import LoadingAnimation from '../components/LoadingAnimation';
import ProyectCard from '../components/ProyectCard';
import useGetProyects from '../hooks/useGetProyects';
import { UserContext } from '../context/UserProvider';
import useDonate from '../hooks/useDonate';

const Home = () => {
  const getProyects = useGetProyects();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [proyectId, setProyectId] = useState(false);
  const [open, setOpen] = useState(false);
  const donate = useDonate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDonate = (proyectId) => {
    setProyectId(proyectId);
    if (!user) {
      navigate('/login');
    } else {
      handleClickOpen();
    }
  };

  const handleDonation = (amount) => {
    donate.mutate({ proyectId, amount, userId: user?.id });
  };

  if (getProyects.isLoading) {
    return <LoadingAnimation />;
  }

  if (getProyects.isError) {
    return <ErrorMessage error="We could not load this page" />;
  }

  return (
    <Grid container spacing={2}>
      <DonationModal
        isLoading={donate.isLoading}
        open={open}
        handleClose={handleClose}
        submit={handleDonation}
      ></DonationModal>
      {getProyects.isSuccess &&
        getProyects.data.map((proyect) => (
          <Fragment key={proyect.id}>
            <Grid item xs={3}>
              <Box mt={23} display="flex" justifyContent="center">
                <Button
                  size="large"
                  color="secondary"
                  variant="contained"
                  onClick={() => handleClickDonate(proyect.id)}
                >
                  Donate
                </Button>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Link style={{ textDecoration: 'none' }} to={'/proyects/' + proyect.id}>
                <ProyectCard proyect={proyect} actionArea />
              </Link>
            </Grid>
            <Divider sx={{ width: '100%' }}></Divider>
          </Fragment>
        ))}
    </Grid>
  );
};

export default Home;
