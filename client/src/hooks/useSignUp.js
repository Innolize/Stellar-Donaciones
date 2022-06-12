import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { UserContext } from '../context/UserProvider';
import api from '../services/api';

const useSignUp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useContext(UserContext);
  return useMutation(singUp, {
    onSuccess: (response) => {
      localStorage.setItem('token', response.data.access_token);
      setUser(response.data.user);
      enqueueSnackbar('Your account has been successfully created!', {
        variant: 'success',
      });
    },
    retry: false,
  });
};

async function singUp(signupInfo) {
  return await api.post('api/auth/signup', { email: signupInfo.email, password: signupInfo.password });
}

export default useSignUp;
