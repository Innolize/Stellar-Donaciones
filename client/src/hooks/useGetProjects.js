import { useQuery } from 'react-query';
// import api from '../services/api';
import mockApi from '../services/mockApi';

const useGetProjects = (page, limit) => {
  return useQuery(['projects', page], () => getProjects(page, limit), {
    onSuccess: () => {},
    retry: 5,
  });
};

async function getProjects(page, limit) {
  try {
    // const response = await api.get('/projects');
    const response = await mockApi.get(`/projects?page=${page}&limit=${limit}`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default useGetProjects;
