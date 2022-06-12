import { useQuery } from 'react-query';
// import api from '../services/api';
import axios from 'axios';

const useGetOrganization = (orgId) => {
  return useQuery(['organization', orgId], () => getOrganization(orgId), {
    onSuccess: () => {},
    retry: 5,
    enabled: !!orgId,
  });
};

async function getOrganization(orgId) {
  try {
    // const response = await api.get('/organization');
    const response = await axios.get(`https://62a5188c47e6e400639b98d3.mockapi.io/organization/${orgId}`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default useGetOrganization;
