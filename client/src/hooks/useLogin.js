import { useMutation } from 'react-query';
import { useContext } from 'react';
import api from '../services/api';
import { UserContext } from '../context/UserProvider';

const useLogin = () => {
  const { setUser } = useContext(UserContext);
  return useMutation(loginUser, {
    onSuccess: (user) => {
      localStorage.setItem('token', user.accessToken);
      setUser(user);
    },
  });
};

async function loginUser(loginInfo) {
  return await api.post('api/auth', loginInfo);
}

export default useLogin;
