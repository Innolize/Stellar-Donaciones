import { useQuery } from 'react-query';
import stellarApi from '../services/stellarApi';

const useGetBalance = (publicKey) => {
  return useQuery(['balance', publicKey], () => getBalance(publicKey), {
    onSuccess: (resp) => {},
    retry: 5,
  });
};

async function getBalance(publicKey) {
  try {
    const response = await stellarApi.get(`/accounts/${publicKey}`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default useGetBalance;
