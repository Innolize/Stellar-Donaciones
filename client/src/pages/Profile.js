import { Box, Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import LoadingAnimation from '../components/LoadingAnimation';
import ProfileCard from '../components/ProfileCard';
import TransactionList from '../components/TransactionList';
import TransactionModal from '../components/TransactionModal';
import { UserContext } from '../context/UserProvider';
import useGetBalance from '../hooks/useGetBalance';
import useGetPayments from '../hooks/useGetPayments';
import * as yup from 'yup';
import useAddFunds, { createTransactionXDR } from '../hooks/useAddFunds';
import * as StellarSdk from 'stellar-sdk';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const getBalance = useGetBalance(user.kPublic);
  const getPayments = useGetPayments(user.kPublic);
  const addFunds = useAddFunds();
  const [amount, setAmount] = useState(20);
  const [txOriginPublicKey, setTxOriginPublicKey] = useState(null);
  const [unsignedXdr, setUnsignedXdr] = useState(null);
  const simpleSignerUrl = 'https://sign-test.plutodao.finance';

  useEffect(() => {
    window.addEventListener('message', getAccountPublicKey);
    window.addEventListener('message', signTx);

    async function createTransaction() {
      if (!!txOriginPublicKey) {
        setUnsignedXdr(
          await createTransactionXDR({ originPublic: txOriginPublicKey, destinationPublic: user.kPublic, amount })
        );
      }
    }
    async function sign() {
      if (unsignedXdr) {
        console.log('entre al sign');
        openSignWindow(unsignedXdr);
      }
    }

    createTransaction();
    sign();
    console.log(unsignedXdr);

    return () => {
      window.removeEventListener('message', getAccountPublicKey);
      window.removeEventListener('message', signTx);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, txOriginPublicKey, unsignedXdr, user]);

  function openConnectWindow(amount) {
    setAmount(amount);
    window.open(`${simpleSignerUrl}/connect`, 'Connect_Window', 'width=360, height=450');
  }

  async function openSignWindow(unsignedXdr) {
    const signWindow = window.open(
      `${simpleSignerUrl}/sign?xdr=${unsignedXdr}`,
      'Sign_Window',
      'width=360, height=700'
    );
    signWindow.postMessage({ unsignedXdr, description: 'test-description' }, simpleSignerUrl);

    return signWindow;
  }

  const resetFundValues = () => {
    setUnsignedXdr(null);
    setTxOriginPublicKey(null);
    setAmount(0);
    setOpenModal(false);
  };

  async function signTx(e) {
    if (e.origin === simpleSignerUrl && e.data.type === 'onSign' && e.data.page === 'sign') {
      console.log('ACA QUIERO LLEGAR');
      const eventMessage = e.data;

      const signedXdr = eventMessage.message.signedXDR;
      // Validate the XDR, this is just good practice.
      if (StellarSdk.xdr.TransactionEnvelope.validateXDR(signedXdr, 'base64')) {
        const server = new StellarSdk.Server('https://horizon-testnet.stellar.org/'); //remember to update this to the correct value

        // Construct the transaction from the signedXDR
        // see https://stellar.github.io/js-stellar-sdk/TransactionBuilder.html#.fromXDR
        const transaction = StellarSdk.TransactionBuilder.fromXDR(
          signedXdr,
          'Test SDF Network ; September 2015' //remember to update this to the correct value
        );

        try {
          const transactionResult = await server.submitTransaction(transaction);
          console.log(transactionResult);
          resetFundValues();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  function getAccountPublicKey(e) {
    // Reject messages that are not coming from simple signer (tailor this according to your needs)
    if (e.origin !== `${simpleSignerUrl}`) {
      return;
    }
    console.log('entre getAccountPublicKey');
    const messageEvent = e.data;

    if (messageEvent.type === 'onConnect') {
      const publicKey = messageEvent.message.publicKey;
      // Validate the public key received. This is just good practice.
      setTxOriginPublicKey(publicKey);
      console.log('The public key is', publicKey);
    }
  }

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

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
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
        open={openModal}
        handleClose={handleClose}
        submit={openConnectWindow}
      ></TransactionModal>
    </>
  );
};

export default Profile;
