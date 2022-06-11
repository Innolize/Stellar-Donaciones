import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { UserContext } from '../context/UserProvider';
import api from '../services/api';

const useSignUp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useContext(UserContext);
  return useMutation(loginUser, {
    onSuccess: (user) => {
      localStorage.setItem('token', user.access_token);
      setUser(user);
      enqueueSnackbar('Your account has been successfully created!', {
        variant: 'success',
      });
    },
    retry: false,
  });
};

async function loginUser(signupInfo) {
  return await api.post('api/user', { email: signupInfo.email, password: signupInfo.password });
}

export default useSignUp;
