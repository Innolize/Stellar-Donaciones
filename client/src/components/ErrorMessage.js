import { Box, Typography } from '@mui/material';

const ErrorMessage = ({ error }) => {
  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Typography variant="h4" color="error">
        {error}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
