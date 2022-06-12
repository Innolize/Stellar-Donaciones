import { Box, Grid } from '@mui/material';
import { useContext, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import LoadingAnimation from '../components/LoadingAnimation';
import ProfileCard from '../components/ProfileCard';
import TransactionList from '../components/TransactionList';
import TransactionModal from '../components/TransactionModal';
import { UserContext } from '../context/UserProvider';
import useGetBalance from '../hooks/useGetBalance';
import useGetPayments from '../hooks/useGetPayments';
import * as yup from 'yup';
import useAddFunds from '../hooks/useAddFunds';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const getBalance = useGetBalance(user.kPublic);
  const getPayments = useGetPayments(user.kPublic);
  const addFunds = useAddFunds();

  if (getBalance.isLoading || getPayments.isLoading) {
    return <LoadingAnimation />;
  }

  if (getBalance.isError || getPayments.isError) {
    return <ErrorMessage error="We could not load your profile" />;
  }

  const validationSchema = yup.object({
    amount: yup
      .number()
      .required('Enter an amount')
      .positive('The amount must be greater than 0')
      .max(600, 'The amount cannot be greater than 600'),
  });

  const handleAddFunds = (amount) => {
    addFunds.mutate({ amount });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box mt={3}>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={12} sm={4}>
            <ProfileCard
              handleClickAddFunds={handleClickOpen}
              userEmail={user?.email || 'thisisatest@email.com'}
              assets={getBalance.data.balances}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TransactionList payments={getPayments.data._embedded.records} />
          </Grid>
        </Grid>
      </Box>
      <TransactionModal
        validationSchema={validationSchema}
        isLoading={addFunds.isLoading}
        title={'Add funds to your account'}
        text={'How much do you want to add to your account?'}
        isError={addFunds.isError}
        open={open}
        handleClose={handleClose}
        submit={handleAddFunds}
      ></TransactionModal>
    </>
  );
};

export default Profile;
