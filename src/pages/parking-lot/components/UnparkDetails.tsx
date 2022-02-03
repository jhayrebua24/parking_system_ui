/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@chakra-ui/react";
import { IUnparkDetails } from "../interface";

interface Props {
  data: IUnparkDetails;
  plate: string;
  close: () => void;
}

function UnparkDetails({
  plate,
  data: { data, message },
  close,
}: Props): JSX.Element {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="font-semibold text-lg">{`${message} ${plate}`}</h1>
      <div>
        <p className="font-semibold">Details</p>
        <p>Total hours: {data?.total_hrs}</p>
        <p>Total overnight parking: {data?.overnight_park}</p>
        <p>Total amount: {data?.total_rate}</p>
        <p>Total in minutes: {data?.total_minutes}</p>
      </div>
      <Button type="button" onClick={close}>
        Close
      </Button>
    </div>
  );
}

export default UnparkDetails;
