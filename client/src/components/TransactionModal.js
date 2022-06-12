import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useFormik } from 'formik';

const TransactionModal = ({ open, handleClose, submit, text, title, validationSchema, isLoading, isError }) => {
  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    validationSchema,
    onSubmit: (values) => {
      submit(values.amount);
    },
  });

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>

          <form onSubmit={formik.handleSubmit}>
            <Box m={2}>
              <TextField
                fullWidth
                id="amount"
                name="amount"
                label="Amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </Box>
            <Box display="flex" justifyContent="center">
              <DialogActions>
                <Button variant="contained" size="large" color="secondary" type="submit">
                  Send
                </Button>
              </DialogActions>
            </Box>
            <Box display="flex" justifyContent="center" mt={3}>
              {isLoading && (
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              )}
              {isError && (
                <Typography variant="body" color="red" align="center">
                  Something went wrong.
                </Typography>
              )}
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransactionModal;
