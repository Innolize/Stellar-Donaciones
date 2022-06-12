import { useContext } from 'react';
import { useMutation } from 'react-query';
import { UserContext } from '../context/UserProvider';
import api from '../services/api';

const useLogin = () => {
  const { setUser } = useContext(UserContext);
  return useMutation(loginUser, {
    onSuccess: (response) => {
      localStorage.setItem('token', response.data.access_token);
      setUser(response.data.user);
    },
    retry: false,
  });
};

async function loginUser(loginInfo) {
  return await api.post('api/auth', loginInfo);
}

export default useLogin;
