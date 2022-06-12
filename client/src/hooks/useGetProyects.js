import { useQuery } from 'react-query';
// import api from '../services/api';
import mockApi from '../services/mockApi';

const useGetProyects = () => {
  return useQuery('proyects', getProyects, {
    onSuccess: () => {},
    retry: 5,
  });
};

async function getProyects() {
  try {
    // const response = await api.get('/proyects');
    const response = await mockApi.get('/proyects');
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default useGetProyects;
