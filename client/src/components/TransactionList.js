import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';

const TransactionList = ({ payments }) => {
  return (
    <Box>
      <Typography align="center" variant="h3">
        Transactions
      </Typography>
      <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', overflow: 'auto' }}>
        <Typography variant="h4">Latest payments</Typography>
        <Divider />
        {payments
          .filter((payment) => payment.type === 'payment' && payment.asset_type !== 'credit_alphanum4')
          .map((payment) => (
            <Box key={payment.id}>
              <ListItem alignItems="flex-start">
                <ListItemText>
                  <Box m={1}>
                    <Typography variant="subtitle2" color="text.primary">
                      From : {payment.from}
                    </Typography>
                  </Box>

                  <Box m={1}>
                    <Typography variant="subtitle2">To: {payment.to}</Typography>
                  </Box>

                  <Box m={1}>
                    <Typography variant="subtitle2">
                      Coin: {payment.asset_type === 'native' ? 'XML' : payment.asset_type}
                    </Typography>
                  </Box>

                  <Box m={1}>
                    <Typography variant="subtitle2">Amount: {payment.amount}</Typography>
                  </Box>
                </ListItemText>
              </ListItem>
              <Divider variant="inset" component="li" />
            </Box>
          ))}
      </List>
    </Box>
  );
};

export default TransactionList;
