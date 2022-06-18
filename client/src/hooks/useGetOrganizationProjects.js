import { useQuery } from 'react-query';
// import api from '../services/api';
import mockApi from '../services/mockApi';

const useGetOrganizationProjects = (orgId) => {
  return useQuery(['organization-balance', orgId], () => getOrganizationProjects(orgId), {
    onSuccess: () => {},
    retry: 5,
  });
};

async function getOrganizationProjects(orgId) {
  try {
    // const response = await api.get(`organization/${orgId}/projects`);
    const response = await mockApi.get('/projects');
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default useGetOrganizationProjects;
