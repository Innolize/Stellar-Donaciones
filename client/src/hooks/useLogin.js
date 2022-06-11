import { useContext } from 'react';
import { useMutation } from 'react-query';
import { UserContext } from '../context/UserProvider';
import api from '../services/api';

const useLogin = () => {
  const { setUser } = useContext(UserContext);
  return useMutation(loginUser, {
    onSuccess: (user) => {
      localStorage.setItem('token', user.access_token);
      setUser(user);
    },
    retry: false,
  });
};

async function loginUser(loginInfo) {
  return await api.post('api/auth', loginInfo);
}

export default useLogin;
