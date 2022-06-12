import { useContext } from 'react';
import { useMutation } from 'react-query';
import { UserContext } from '../context/UserProvider';
import api from '../services/api';

const useRefreshCredentials = () => {
  const { setUser } = useContext(UserContext);
  return useMutation(refreshCredentials, {
    onSuccess: (response) => {
      setUser(response.data.user);
      localStorage.setItem('token', response.data.access_token);
    },
    retry: false,
  });
};

async function refreshCredentials() {
  return await api.post('api/auth');
}

export default useRefreshCredentials;
