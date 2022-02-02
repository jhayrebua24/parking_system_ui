/* eslint-disable camelcase */
interface Props {
  data: {
    distance: number;
    entrance_name: string;
    slot_detail_id: number;
    tile_id: number;
    type: string;
    type_id: number;
  };
}

function AvailableSlotDetails({ data }: Props): JSX.Element {
  return (
    <div className="py-4 flex flex-col">
      <div>
        <span className="font-semibold">Entry point: </span>
        {data.entrance_name}
      </div>
      <div>
        <span className="font-semibold">Distance: </span>
        {data.distance}
      </div>
      <div>
        <span className="font-semibold">Slot ID: </span>
        {data.tile_id}
      </div>
      <div>
        <span className="font-semibold">Slot type: </span>
        {data.type}
      </div>
    </div>
  );
}

export default AvailableSlotDetails;
