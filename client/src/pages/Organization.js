import { Box, Typography } from '@mui/material';
import useGetOrganization from '../hooks/useGetOrganization';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import LoadingAnimation from '../components/LoadingAnimation';
import useGetStellarOrganization from '../hooks/useGetStellarOrganization';

const Organization = () => {
  const { id } = useParams();
  const getOrganization = useGetOrganization(id);
  const getStellarOrganization = useGetStellarOrganization(getOrganization.data?.kPublic);

  if (getOrganization.isLoading || getStellarOrganization.isLoading) {
    return <LoadingAnimation />;
  }

  if (getOrganization.isError || getStellarOrganization.isError) {
    return <ErrorMessage error="We could not load this page" />;
  }

  return (
    <Box>
      <Typography></Typography>
    </Box>
  );
};

export default Organization;
