import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { getRefresh } from './api/auth';

function App() {
  useEffect(() => {
    getRefresh();
  }, []);

  return <Outlet />;
}

export default App;
