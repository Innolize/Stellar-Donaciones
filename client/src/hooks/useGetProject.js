import { useQuery } from 'react-query';
// import api from '../services/api';
import mockApi from '../services/mockApi';

const useGetProject = (projectId) => {
  return useQuery(['project', projectId], () => getProject(projectId), {
    onSuccess: () => {},
    retry: 5,
  });
};

async function getProject(projectId) {
  try {
    // const response = await api.get(`/projects/${projectId}`);
    const response = await mockApi.get(`/projects/${projectId}`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default useGetProject;
