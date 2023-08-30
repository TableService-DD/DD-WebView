import { Outlet } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { getRefresh } from './api/auth';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await getRefresh();
    };
    fetchData();
  }, []);
  return <Outlet />;
}

export default App;
