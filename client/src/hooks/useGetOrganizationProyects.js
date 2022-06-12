import { useQuery } from 'react-query';
// import api from '../services/api';
import mockApi from '../services/mockApi';

const useGetOrganizationProyects = (orgId) => {
  return useQuery(['organization-balance', orgId], () => getOrganizationProyects(orgId), {
    onSuccess: () => {},
    retry: 5,
  });
};

async function getOrganizationProyects(orgId) {
  try {
    // const response = await api.get(`organization/${orgId}/proyects`);
    const response = await mockApi.get('/proyects');
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default useGetOrganizationProyects;
