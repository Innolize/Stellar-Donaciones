import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import api from '../services/api';
import * as StellarSdk from 'stellar-sdk';

const useAddFunds = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(addFunds, {
    onSuccess: (response) => {
      enqueueSnackbar('Your founds have been added', {
        variant: 'success',
      });
    },
    retry: false,
  });
};

async function addFunds({ amount }) {
  return await api.post(`api/transaction/fund/${amount}`);
}

export const createTransactionXDR = async ({ originPublic, destinationPublic, amount }) => {
  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org/');
  try {
    const originAccountKeypar = StellarSdk.Keypair.fromPublicKey(originPublic);
    const originAccount = await server.loadAccount(originAccountKeypar.publicKey());
    const transaction = new StellarSdk.TransactionBuilder(originAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
      memo: 'test-memo',
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destinationPublic,
          asset: StellarSdk.Asset.native(),
          amount: amount.toString(),
        })
      )
      .addMemo(StellarSdk.Memo.text('Test Transaction'))
      .setTimeout(180)
      .build();

    return transaction.toEnvelope().toXDR('base64');
  } catch (error) {
    console.log(error);
    throw Error('stellar error');
  }
};

export default useAddFunds;
