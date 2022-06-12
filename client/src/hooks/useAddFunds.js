import { useMutation } from 'react-query';
import api from '../services/api';

const useAddFunds = (values) => {
  return useMutation(addFunds, {
    onSuccess: (response) => {},
    retry: false,
  });
};

async function addFunds({ amount }) {
  return await api.post(`api/transaction/fund/${amount}`);
}

export default useAddFunds;
