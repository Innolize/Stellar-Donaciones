import { useQuery } from 'react-query';
import stellarApi from '../services/stellarApi';

const useGetPayments = (publicKey) => {
  return useQuery(['payments', publicKey], () => getPayments(publicKey), {
    onSuccess: (resp) => {},
    retry: 5,
  });
};

async function getPayments(publicKey) {
  try {
    const response = await stellarApi.get(`/accounts/${publicKey}/payments?limit=5`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default useGetPayments;
