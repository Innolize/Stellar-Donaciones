import { useQuery } from 'react-query';
// import api from '../services/api';
import axios from 'axios';

const useGetProyect = (proyectId) => {
  return useQuery(['proyect', proyectId], () => getProyect(proyectId), {
    onSuccess: () => {},
    retry: 5,
  });
};

async function getProyect(proyectId) {
  try {
    // const response = await api.get('/proyects');
    const response = await axios.get(`https://62a5188c47e6e400639b98d3.mockapi.io/proyects/${proyectId}`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default useGetProyect;
