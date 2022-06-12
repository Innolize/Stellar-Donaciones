import { useQuery } from 'react-query';
// import api from '../services/api';
import mockApi from '../services/mockApi';

const useGetOrganization = (orgId) => {
  return useQuery(['organization', orgId], () => getOrganization(orgId), {
    onSuccess: () => {},
    retry: 5,
    enabled: !!orgId,
  });
};

async function getOrganization(orgId) {
  try {
    // const response = await api.get(`/organization/${orgId}`);
    const response = await mockApi.get(`/organization/${orgId}`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default useGetOrganization;
