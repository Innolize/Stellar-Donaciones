import { Grid } from '@mui/material';
import { useContext } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import LoadingAnimation from '../components/LoadingAnimation';
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
    return <LoadingAnimation />;
  }

  if (getBalance.isError || getPayments.isError) {
    return <ErrorMessage error="We could not load your profile" />;
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
