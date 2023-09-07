import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className=" max-w-lg mx-auto border-x-2 p-1">
      <Outlet />
    </div>
  );
}

export default App;
