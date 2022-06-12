import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import LoadingAnimation from '../components/LoadingAnimation';
import ProyectCard from '../components/ProyectCard';
import useGetOrganization from '../hooks/useGetOrganization';
import useGetProyect from '../hooks/useGetProyect';

const Proyect = () => {
  const { id } = useParams();
  const getProyect = useGetProyect(id);
  const getOrganization = useGetOrganization(getProyect.data?.author_id);

  if (getProyect.isLoading || getOrganization.isLoading) {
    return <LoadingAnimation />;
  }

  if (getProyect.isError || getOrganization.isError) {
    return <ErrorMessage error="We could not load this page" />;
  }

  return (
    <Box m={2}>
      <Box ml={4}>
        <Link component={RouterLink} to={'/organizations/' + getOrganization.data.id}>
          <Typography variant="h5">Organization: {getOrganization.data.email}</Typography>
        </Link>
      </Box>
      <ProyectCard variant="detailed" proyect={getProyect.data} />
    </Box>
  );
};

export default Proyect;
