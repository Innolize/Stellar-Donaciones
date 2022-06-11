import { useMutation } from 'react-query';
import { useContext } from 'react';
import api from '../services/api';
import { UserContext } from '../context/UserProvider';

const useSignUp = () => {
  const { setUser } = useContext(UserContext);
  return useMutation(loginUser, {
    onSuccess: (user) => {
      setUser(user);
    },
  });
};

async function loginUser(signupInfo) {
  return await api.post('api/signup', signupInfo);
}

export default useSignUp;
