import { Box, Button, Divider, Grid } from '@mui/material';
import { Fragment, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import TransactionModal from '../components/TransactionModal';
import LoadingAnimation from '../components/LoadingAnimation';
import ProyectCard from '../components/ProyectCard';
import useGetProyects from '../hooks/useGetProyects';
import { UserContext } from '../context/UserProvider';
import useDonate from '../hooks/useDonate';
import * as yup from 'yup';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  btn: {
    [theme.breakpoints.up('xs')]: {
      marginBottom: '50px',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '220px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const getProyects = useGetProyects();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [proyect, setProyect] = useState(false);
  const [open, setOpen] = useState(false);
  const donate = useDonate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDonate = (proyect) => {
    setProyect(proyect);
    if (!user) {
      navigate('/login');
    } else {
      handleClickOpen();
    }
  };

  const handleDonation = (amount) => {
    donate.mutate({ proyectId: proyect.id, amount });
  };

  if (getProyects.isLoading) {
    return <LoadingAnimation />;
  }

  if (getProyects.isError) {
    return <ErrorMessage error="We could not load this page" />;
  }

  const validationSchema = yup.object({
    amount: yup
      .number()
      .required('Enter an amount')
      .positive('The amount must be greater than 0')
      .max(user.balance, 'The amount cannot be greater than your balance'),
  });

  return (
    <Grid container spacing={{ xs: 1, sm: 2 }}>
      <TransactionModal
        validationSchema={validationSchema}
        isLoading={donate.isLoading}
        title={'Make a donation to: ' + proyect.name}
        text={'You have ' + user.balance + ' XML in your wallet. How much do you want to donate?'}
        isError={donate.isError}
        open={open}
        handleClose={handleClose}
        submit={handleDonation}
      ></TransactionModal>
      {getProyects.data.map((proyect) => (
        <Fragment key={proyect.id}>
          <Grid item xs={12} sm={9}>
            <Link style={{ textDecoration: 'none' }} to={'/proyects/' + proyect.id}>
              <ProyectCard proyect={proyect} actionArea />
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box display="flex" justifyContent="center">
              <Button
                className={classes.btn}
                size="large"
                color="secondary"
                variant="contained"
                onClick={() => handleClickDonate(proyect)}
              >
                Donate
              </Button>
            </Box>
          </Grid>
          <Divider sx={{ width: '100%' }}></Divider>
        </Fragment>
      ))}
    </Grid>
  );
};

export default Home;
