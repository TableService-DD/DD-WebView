import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Test from "./pages/Test";

function App() {
  return (
    <div>
      <RecoilRoot>
      <Outlet />
      <Test/>
      </RecoilRoot>
    </div>
  );
}

export default App;
