import { Box, Card, CardActionArea, CardMedia, CardContent, Typography, Divider, Grid } from '@mui/material';

const ProyectCard = ({ proyect, variant }) => {
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

  return (
    <Box>
      <Card sx={{ maxWidth: '80%', marginX: 'auto', marginY: 2 }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={proyect.image} />
          <CardContent>
            <Typography align="center" gutterBottom variant="h3" component="div">
              {proyect.name}
            </Typography>
            <Typography mt={4} align="center" variant="h6">
              Description
            </Typography>
            <Typography m={2} align="center" variant="body2" color="text.secondary">
              {proyect.description}
            </Typography>
            <Divider />
            <Box>
              <Typography align="center" mt={4} variant="h6">
                Proyect goal: {proyect.goal} XML
              </Typography>
            </Box>
          </CardContent>
          {variant === 'detailed' && (
            <Box m={5}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center">
                    Started the day: {toDate(proyect.start)} at {getHoursSecondsMinutes(proyect.start)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="center">
                    Finishes the day: {toDate(proyect.to)} at {getHoursSecondsMinutes(proyect.to)}
                  </Typography>
                </Grid>
              </Grid>

              <Box mt={4}>
                <Typography align="center" variant="h6" color="darkgreen">
                  Time left: {timeToFinish(proyect.to)}
                </Typography>
              </Box>
            </Box>
          )}
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default ProyectCard;
