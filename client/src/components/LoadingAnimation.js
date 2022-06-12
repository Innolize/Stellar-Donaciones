import { Box, CircularProgress } from '@mui/material';

const LoadingAnimation = () => {
  return (
    <Box mt={3} display="flex" justifyContent="center">
      <CircularProgress></CircularProgress>
    </Box>
  );
};

export default LoadingAnimation;
