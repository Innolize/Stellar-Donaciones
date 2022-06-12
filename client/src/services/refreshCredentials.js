import { useState, useEffect } from 'react';
import LoadingAnimation from '../components/LoadingAnimation';
import useRefreshCredentials from '../hooks/useRefreshCredentials';

const RefreshCredentials = ({ children }) => {
  const [didLoad, setDidLoad] = useState(false);
  const refresh = useRefreshCredentials();

  useEffect(() => {
    if (!didLoad) {
      refresh.mutate();
      setDidLoad(true);
    }
  }, [didLoad, refresh]);

  if (refresh.isSuccess || refresh.isError) {
    return children;
  } else {
    return <LoadingAnimation></LoadingAnimation>;
  }
};

export default RefreshCredentials;
