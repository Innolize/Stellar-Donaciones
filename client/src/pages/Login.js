import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';
import useLogin from '../hooks/useLogin';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required.'),
  password: yup.string().required('Password is required.'),
});

const Login = () => {
  const login = useLogin();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      login.mutate(values);
    },
  });

  return (
    <Container>
      <Box margin="auto" maxWidth={800} mt={6}>
        <form onSubmit={formik.handleSubmit}>
          <Box m={2}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box m={2}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button color="secondary" variant="contained" size="large" type="submit">
              Login
            </Button>
          </Box>
          <Box mt={3}>
            {login.isLoading && (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            )}
            {login.isError && (
              <Typography variant="h4" color="red" align="center">
                {login.error.message}
              </Typography>
            )}
          </Box>
        </form>

        {login.isSuccess && <Navigate to="/"></Navigate>}
      </Box>
    </Container>
  );
};

export default Login;
