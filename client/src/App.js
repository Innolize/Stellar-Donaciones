import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserProvider from './context/UserProvider';
import AppRoutes from './routes/AppRoutes';
import RefreshCredentials from './services/refreshCredentials';
import theme from './theme';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SnackbarProvider>
          <RefreshCredentials>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppRoutes />
            </ThemeProvider>
          </RefreshCredentials>
        </SnackbarProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
