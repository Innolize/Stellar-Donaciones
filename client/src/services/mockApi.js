import axios from 'axios';

const mockApi = axios.create({
  baseURL: 'https://62a5188c47e6e400639b98d3.mockapi.io',
});

export default mockApi;
