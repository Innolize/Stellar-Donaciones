import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import profileImage from '../assets/profile-image.png';

const ProfileCard = ({ userEmail, assets }) => {
  return (
    <Box mt={3}>
      <Card elevation={5} sx={{ maxWidth: 345 }}>
        <Box mt={2} display="flex" alignItems="center" flexDirection="column">
          <Box
            component="img"
            sx={{
              height: 90,
              width: 80,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              borderRadius: '50%',
            }}
            alt="The house from the offer."
            src={profileImage}
          />
          <Box mt={1}>
            <Typography>{userEmail}</Typography>
          </Box>
        </Box>
        <CardContent>
          <Box mt={1}>
            <Typography variant="h6">User assets</Typography>
          </Box>
          <Box mt={1}>
            {assets.map((asset) => (
              <Box key={asset.asset_type}>
                <Box>
                  <Typography colo="secondary" display="inline">
                    {asset.asset_type === 'native' ? 'XML' : asset.asset_type} {': '}
                  </Typography>
                  <Typography display="inline">{asset.balance}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
        <Box m={1}>
          <Button fullWidth variant="contained" color="secondary" size="large">
            Add more funds
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileCard;
