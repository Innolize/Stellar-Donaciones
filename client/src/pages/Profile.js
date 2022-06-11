import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import ProfileCard from '../components/ProfileCard';
import TransactionList from '../components/TransactionList';
import { UserContext } from '../context/UserProvider';
import useGetBalance from '../hooks/useGetBalance';
import useGetPayments from '../hooks/useGetPayments';

const Profile = () => {
  const { user } = useContext(UserContext);
  const getBalance = useGetBalance(user.kPublic);
  const getPayments = useGetPayments(user.kPublic);

  if (getBalance.isLoading || getPayments.isLoading) {
    return (
      <Box mt={2} display="flex" justifyContent="center">
        <CircularProgress></CircularProgress>
      </Box>
    );
  }

  if (getBalance.isError || getPayments.isError) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <Typography variant="h4" color="error">
          Something went wrong.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={4}>
          {getBalance.isSuccess && (
            <ProfileCard userEmail={user?.email || 'thisisatest@email.com'} assets={getBalance.data.balances} />
          )}
        </Grid>
        <Grid item xs={8}>
          {getPayments.isSuccess && <TransactionList payments={getPayments.data._embedded.records} />}
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
