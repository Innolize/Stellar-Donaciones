import { Box, Typography, Grid } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import LoadingAnimation from '../components/LoadingAnimation';
import ProyectCard from '../components/ProyectCard';
import useGetOrganization from '../hooks/useGetOrganization';
import useGetBalance from '../hooks/useGetBalance';
import useGetOrganizationProyects from '../hooks/useGetOrganizationProyects';
import TransactionList from '../components/TransactionList';
import useGetPayments from '../hooks/useGetPayments';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const Organization = () => {
  const { id } = useParams();
  const getOrganization = useGetOrganization(id);
  // const getBalance = useGetBalance(getOrganization.data?.kPublic);
  // const getPayments = useGetPayments(getOrganization.data?.kPublic);
  // const getOrganizationProyects = useGetOrganizationProyects(getOrganization.data?.id);
  const getBalance = useGetBalance('GB624QTTEB2BGMTJKKCDX4NQ6ZTRTT7SIO3VQFJ6COMTSW5NERJF4EYD');
  const getPayments = useGetPayments('GBLJNDUPJKG4SNZMM44DGGHK7SF7JTKI5M4UVKVL7OYPDQTN5YFU6NQY');
  const getOrganizationProyects = useGetOrganizationProyects('1');

  if (getOrganization.isLoading || getPayments.isLoading || getBalance.isLoading || getOrganizationProyects.isLoading) {
    return <LoadingAnimation />;
  }

  if (getOrganization.isError || getPayments.isError || getBalance.isError || getOrganizationProyects.isError) {
    return <ErrorMessage error="We could not load this page" />;
  }

  const getAmountOfVotes = (orgBalance, vote) => {
    const votes = orgBalance.filter((balance) => balance.asset_code === vote)[0].balance;
    return Number(votes);
  };

  const orgBalance = getBalance.data.balances;
  const orgPayments = getPayments.data._embedded.records;
  const orgInfo = getOrganization.data;
  const orgProyects = getOrganizationProyects.data;
  const goodVotes = getAmountOfVotes(orgBalance, 'GOOD');
  const badVotes = getAmountOfVotes(orgBalance, 'BAD');
  const percentageRep = (goodVotes / (goodVotes + badVotes)) * 100;

  return (
    <Box>
      <Box m={2}>
        <Typography align="center" variant="h4">
          Organization: {orgInfo.email}
        </Typography>
      </Box>
      <Box m={5}>
        <Typography variant="h6" align="center">
          The reputacion of the organization is: {percentageRep.toFixed(0)}%
        </Typography>

        <Box p={1}>
          <Typography align="center">User feedback</Typography>
          <Box display="flex" justifyContent="center">
            <Box m={1} display="flex">
              <Box mx={2} display="flex">
                <InsertEmoticonIcon></InsertEmoticonIcon>
                <Typography display="inline">{goodVotes}</Typography>
              </Box>

              <Box mx={2} display="flex">
                <SentimentVeryDissatisfiedIcon></SentimentVeryDissatisfiedIcon>
                <Typography display="inline">{badVotes}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={{ xs: 1, md: 7 }}>
        <Grid item xs={12} md={7}>
          <Box align="center">
            <Typography variant="h4" align="center">
              Check out more proyects from this org
            </Typography>
          </Box>
          {orgProyects.map((proyect) => (
            <Box key={proyect.id}>
              <Link style={{ textDecoration: 'none' }} to={'/proyects/' + proyect.id}>
                <ProyectCard proyect={proyect} actionArea />
              </Link>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={5}>
          <TransactionList payments={orgPayments}></TransactionList>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Organization;
