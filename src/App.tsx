import { ModalProvider } from "hooks/useModal";
import ParkingLotList from "pages/parking-lot-list/ParkingLotList";
import ParkingLot from "pages/parking-lot/ParkingLot";
import { Route, Routes } from "react-router-dom";

function App(): JSX.Element {
  return (
    <div className="h-screen min-w-screen flex justify-center items-center">
      <div className="flex-grow flex flex-col h-full container mx-auto">
        <ModalProvider>
          <Routes>
            <Route path="/:parkingId" element={<ParkingLot />} />
            <Route path="/" element={<ParkingLotList />} />
          </Routes>
        </ModalProvider>
      </div>
    </div>
  );
}

export default App;
