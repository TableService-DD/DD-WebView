import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div>
      <RecoilRoot>
      <Outlet />
      </RecoilRoot>
    </div>
  );
}

export default App;
