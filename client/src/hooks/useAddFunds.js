import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import api from '../services/api';

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

export default useAddFunds;
