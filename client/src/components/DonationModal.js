import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';

const DonationModal = ({ open, handleClose, submit }) => {
  const [amount, setAmount] = useState('');

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <DialogContentText>Do you want to donate money to this organization?</DialogContentText>
          <TextField
            onChange={(e) => setAmount(e.target.value)}
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => submit(amount)}>Yes, donate</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DonationModal;
