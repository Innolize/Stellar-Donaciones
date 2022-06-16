import { Paper, Avatar, Button, Grid, Container, Box, Typography, Link } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import LoadingAnimation from '../components/LoadingAnimation';
import useGetOrganization from '../hooks/useGetOrganization';
import useGetProyect from '../hooks/useGetProyect';
import Image from 'mui-image';
import LinearProgressBar from '../components/LinearProgressBar';

const Proyect = () => {
  const { id } = useParams();
  const getProyect = useGetProyect(id);
  const getOrganization = useGetOrganization(getProyect.data?.author_id);

  if (getProyect.isLoading || getOrganization.isLoading) {
    return <LoadingAnimation />;
  }

  if (getProyect.isError || getOrganization.isError) {
    return <ErrorMessage error="We could not load this page" />;
  }

  const timeToFinish = (isoString) => {
    const today = new Date();
    const MS_PER_MIN = 60000;
    let minDiff = Math.floor((new Date(isoString).getTime() - today) / MS_PER_MIN);
    let hourDiff = 0;
    let dayDiff = 0;

    while (minDiff > 60) {
      minDiff -= 60;
      hourDiff++;
    }

    while (hourDiff > 24) {
      hourDiff -= 24;
      dayDiff++;
    }

    if (dayDiff <= 0 && hourDiff <= 0 && minDiff <= 0) {
      return 'Already ended';
    }

    return `${dayDiff} days, ${hourDiff} hours and ${minDiff} minutes left. `;
  };

  const toDate = (isoString) => {
    const date = new Date(isoString).toLocaleDateString('en-GB');
    return date;
  };

  const getHoursSecondsMinutes = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', { minute: 'numeric', hour: 'numeric', hour12: true });
  };

  const proyect = getProyect.data;

  return (
    <Container>
      <Box mt={5}>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          <Grid item sm={6}>
            <Image src={proyect.image}></Image>
          </Grid>
          <Grid item sm={6}>
            <Typography align="center" variant="h4">
              {proyect.name}
            </Typography>
            <Link component={RouterLink} to={'/organizations/' + getOrganization.data.id}>
              <Typography align="center" variant="subtitle2">
                By {getOrganization.data.name}
              </Typography>
            </Link>
            <Box my={2} mx={5}>
              <Typography variant="body">{proyect.description}</Typography>
              <Box my={2}>
                <Typography variant="h6">
                  Started the day: {toDate(proyect.start)} at {getHoursSecondsMinutes(proyect.start)}
                </Typography>
                <Typography variant="h6">
                  Finishes the day: {toDate(proyect.to)} at {getHoursSecondsMinutes(proyect.to)}
                </Typography>
              </Box>

              <Typography variant="h6">Goal: {proyect.goal} XML</Typography>
              <LinearProgressBar value={proyect.progress} />
              <Typography variant="subtitle">{Math.round(Number(proyect.raised))} XML raised.</Typography>
              <Box mt={3}>
                <Button size="large" color="secondary" variant="contained">
                  Donate
                </Button>
              </Box>
              <Box mt={4}>
                <Typography align="center" variant="body" color="darkgreen">
                  Time left: {timeToFinish(proyect.to)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={{ xs: 1, sm: 2 }} m={5}>
        <Grid mt={6} item xs={12} sm={6}>
          <Box>
            <Typography variant="h5">Comments</Typography>
            {proyect.comments.map((comment) => (
              <Paper elevation={3} style={{ padding: '10px 10px', margin: '10px' }}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: 'left' }}>{comment.author}</h4>
                    <p style={{ textAlign: 'left' }}>{comment.message}</p>
                    <p style={{ textAlign: 'left', color: 'gray' }}>{comment.date}</p>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Proyect;
