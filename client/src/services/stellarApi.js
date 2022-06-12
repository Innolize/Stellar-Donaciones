import axios from 'axios';

const stellarApi = axios.create({
  baseURL: 'https://horizon-testnet.stellar.org',
});

export default stellarApi;
