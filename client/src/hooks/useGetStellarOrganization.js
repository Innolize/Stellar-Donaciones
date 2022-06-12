import { useQuery } from 'react-query';
import stellarApi from '../services/stellarApi';

const useGetStellarOrganization = (publicKey) => {
  return useQuery(['organization-stellar', publicKey], () => getOrganization(publicKey), {
    onSuccess: (resp) => {},
    retry: 5,
  });
};

async function getOrganization(publicKey) {
  try {
    const response = await stellarApi.get(`/accounts/${publicKey}`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default useGetStellarOrganization;
