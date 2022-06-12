import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required.'),
  password: yup.string().required('Password is required.'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUp = () => {
  const signUp = useSignUp();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: (values) => {
      signUp.mutate(values);
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
          <Box m={2}>
            <TextField
              fullWidth
              id="password-confirmation"
              name="passwordConfirmation"
              label="Password confirmation"
              type="password"
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
              helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button color="secondary" variant="contained" size="large" type="submit">
              Sign Up
            </Button>
          </Box>
          <Box mt={3}>
            {signUp.isLoading && (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            )}
            {signUp.isError && (
              <Typography variant="h4" color="red" align="center">
                {signUp.error.message}
              </Typography>
            )}
          </Box>
        </form>

        {signUp.isSuccess && <Navigate to="/"></Navigate>}
      </Box>
    </Container>
  );
};

export default SignUp;
