import { Box, Grid, Pagination, Typography, Container } from '@mui/material';
import { Fragment, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import LoadingAnimation from '../components/LoadingAnimation';
import ProyectCard from '../components/ProyectCard';
import useGetProyects from '../hooks/useGetProyects';
import Image from 'mui-image';
import homeImg from '../assets/home.webp';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  homeText: {
    position: 'absolute',
    [theme.breakpoints.up('xs')]: {
      top: '80%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
    },
    [theme.breakpoints.up('sm')]: {
      top: '50%',
      left: '80%',
      width: 'inherit',
      transform: 'translate(-50%, -50%)',
    },
  },
}));

const Home = () => {
  const LIMIT = 12;
  const myRef = useRef(null);
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const getProyects = useGetProyects(page, LIMIT);

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, myRef.current.offsetTop);
  };

  return (
    <Box>
      <Box sx={{ position: 'relative' }}>
        <Image showLoading errorIcon src={homeImg} height="100vh" />
        <Typography variant="h3" className={classes.homeText}>
          Everything you need for nonprofit fundraising success.
        </Typography>
      </Box>
      <Container>
        <Typography ref={myRef} m={3} variant="h4" align="center">
          Check out some proyects
        </Typography>
        {getProyects.isLoading ? (
          <Box height="100vh" mt={35}>
            <LoadingAnimation />
          </Box>
        ) : getProyects.isError ? (
          <ErrorMessage error="We could not load the proyects" />
        ) : (
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {getProyects.data.items.map((proyect) => (
              <Fragment key={proyect.id}>
                <Grid item xs={6} sm={4}>
                  <Link style={{ textDecoration: 'none' }} to={'/proyects/' + proyect.id}>
                    <ProyectCard proyect={proyect} actionArea />
                  </Link>
                </Grid>
              </Fragment>
            ))}
            <Box marginX="auto" marginY={4}>
              <Pagination
                page={page}
                onChange={handleChange}
                count={Math.round(Number(getProyects.data.count) / LIMIT)}
                variant="outlined"
                shape="rounded"
              />
            </Box>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Home;
