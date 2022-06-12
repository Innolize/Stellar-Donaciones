import { useQuery } from 'react-query';
// import api from '../services/api';
import mockApi from '../services/mockApi';

const useGetProyect = (proyectId) => {
  return useQuery(['proyect', proyectId], () => getProyect(proyectId), {
    onSuccess: () => {},
    retry: 5,
  });
};

async function getProyect(proyectId) {
  try {
    // const response = await api.get(`/proyects/${proyectId}`);
    const response = await mockApi.get(`/proyects/${proyectId}`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default useGetProyect;
