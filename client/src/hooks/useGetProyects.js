import { useQuery } from 'react-query';
// import api from '../services/api';
import mockApi from '../services/mockApi';

const useGetProyects = (page, limit) => {
  return useQuery(['proyects', page], () => getProyects(page, limit), {
    onSuccess: () => {},
    retry: 5,
  });
};

async function getProyects(page, limit) {
  try {
    // const response = await api.get('/proyects');
    const response = await mockApi.get(`/proyects?page=${page}&limit=${limit}`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default useGetProyects;
