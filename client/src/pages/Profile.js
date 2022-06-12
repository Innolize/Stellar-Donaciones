import { Box, Grid } from '@mui/material';
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
  // const getBalance = useGetBalance(user.kPublic);
  // const getPayments = useGetPayments(user.kPublic);
  const getBalance = useGetBalance('GAKPPJNV375FQIXARXDIR5PUILOLRWV3MXVTXLJ44JR67UTZ6P4OTDD4');
  const getPayments = useGetPayments('GAKPPJNV375FQIXARXDIR5PUILOLRWV3MXVTXLJ44JR67UTZ6P4OTDD4');

  if (getBalance.isLoading || getPayments.isLoading) {
    return <LoadingAnimation />;
  }

  if (getBalance.isError || getPayments.isError) {
    return <ErrorMessage error="We could not load your profile" />;
  }

  return (
    <Box mt={3}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={12} sm={4}>
          <ProfileCard userEmail={user?.email || 'thisisatest@email.com'} assets={getBalance.data.balances} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TransactionList payments={getPayments.data._embedded.records} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
