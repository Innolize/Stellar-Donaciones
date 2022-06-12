import { useMutation } from 'react-query';
import api from '../services/api';

const useDonate = () => {
  return useMutation(donate, {
    onSuccess: (response) => {},
    retry: false,
  });
};

async function donate(info) {
  return await api.post('api/donate', info);
}

export default useDonate;
