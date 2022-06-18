import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import LoadingAnimation from '../components/LoadingAnimation';
import ProjectCard from '../components/ProjectCard';
import TransactionList from '../components/TransactionList';
import useGetBalance from '../hooks/useGetBalance';
import useGetOrganization from '../hooks/useGetOrganization';
import useGetOrganizationProjects from '../hooks/useGetOrganizationProjects';
import useGetPayments from '../hooks/useGetPayments';

const Organization = () => {
  const { id } = useParams();
  const getOrganization = useGetOrganization(id);
  // const getBalance = useGetBalance(getOrganization.data?.kPublic);
  // const getPayments = useGetPayments(getOrganization.data?.kPublic);
  // const getOrganizationProjects = useGetOrganizationProjects(getOrganization.data?.id);
  const getBalance = useGetBalance('GB624QTTEB2BGMTJKKCDX4NQ6ZTRTT7SIO3VQFJ6COMTSW5NERJF4EYD');
  const getPayments = useGetPayments('GBLJNDUPJKG4SNZMM44DGGHK7SF7JTKI5M4UVKVL7OYPDQTN5YFU6NQY');
  const getOrganizationProjects = useGetOrganizationProjects('1');

  if (getOrganization.isLoading || getPayments.isLoading || getBalance.isLoading || getOrganizationProjects.isLoading) {
    return <LoadingAnimation />;
  }

  if (getOrganization.isError || getPayments.isError || getBalance.isError || getOrganizationProjects.isError) {
    return <ErrorMessage error="We could not load this page" />;
  }

  const getAmountOfVotes = (orgBalance, vote) => {
    const votes = orgBalance.filter((balance) => balance.asset_code === vote)[0].balance;
    return Number(votes);
  };

  const orgBalance = getBalance.data.balances;
  const orgPayments = getPayments.data._embedded.records;
  const orgInfo = getOrganization.data;
  const orgProjects = getOrganizationProjects.data.items;
  const goodVotes = getAmountOfVotes(orgBalance, 'GOOD');
  const badVotes = getAmountOfVotes(orgBalance, 'BAD');
  const percentageRep = (goodVotes / (goodVotes + badVotes)) * 100;

  return (
    <Container>
      <Box m={5}>
        <Typography my={3} align="center" variant="h4">
          {orgInfo.name}
        </Typography>
        <Image height={500} src={orgInfo.image}></Image>
      </Box>

      <Grid container spacing={{ xs: 1, md: 7 }}>
        <Grid item xs={12} md={7}>
          <Box align="center">
            <Typography variant="h4" align="center">
              More projects
            </Typography>
          </Box>
          {orgProjects.map((project) => (
            <Box key={project.id}>
              <Link style={{ textDecoration: 'none' }} to={'/projects/' + project.id}>
                <ProjectCard project={project} actionArea />
              </Link>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={5}>
          <Box mt={1} display="flex" justifyContent="space-between">
            <Typography variant="h5" align="center">
              Reputation: {percentageRep.toFixed(0)}%
            </Typography>

            <Box alignItems="center" display="flex">
              <Typography variant="h5" align="center">
                Votes:
              </Typography>
              <Box mx={1} display="flex" alignItems="center">
                <InsertEmoticonIcon size="lg"></InsertEmoticonIcon>
                <Typography variant="h6" display="inline">
                  {goodVotes}
                </Typography>
              </Box>

              <Box mx={1} display="flex" alignItems="center">
                <SentimentVeryDissatisfiedIcon size="large"></SentimentVeryDissatisfiedIcon>
                <Typography variant="h6" display="inline">
                  {badVotes}
                </Typography>
              </Box>
            </Box>
          </Box>
          <TransactionList payments={orgPayments}></TransactionList>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Organization;
