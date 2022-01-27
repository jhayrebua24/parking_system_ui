import ParkingLotList from "pages/parking-lot-list/ParkingLotList";
import { Route, Routes } from "react-router-dom";

function App(): JSX.Element {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={<ParkingLotList />} />
      </Routes>
    </div>
  );
}

export default App;
