import { ModalProvider } from "hooks/useModal";
import Page404 from "pages/errors/Page404";
import ParkingLotList from "pages/parking-lot-list/ParkingLotList";
import ParkingLot from "pages/parking-lot/ParkingLot";
import { Route, Routes } from "react-router-dom";

function App(): JSX.Element {
  return (
    <div className="h-screen min-w-screen flex justify-center items-center">
      <div className="flex-grow flex flex-col h-full container mx-auto">
        <ModalProvider>
          <Routes>
            <Route path="*" element={<Page404 />} />
            <Route path="/404" element={<Page404 />} />
            <Route path="/:parkingId" element={<ParkingLot />} />
            <Route path="/" element={<ParkingLotList />} />
          </Routes>
        </ModalProvider>
      </div>
    </div>
  );
}

export default App;
