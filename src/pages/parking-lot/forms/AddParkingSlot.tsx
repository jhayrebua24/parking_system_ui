/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import FormButtons from "components/FormButtons";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import FormSelect from "components/FormSelect";
import { useErrorToast } from "hooks/useCustomToast";
import { useAddParkingSlots, useGetParkingSlotTypes } from "../hooks";
import {
  ISlotTypesData,
  ITileDetails,
  ITilesEntranceDetails,
} from "../interface";
import { formatAndGetDistance } from "../helper";

// validation
const validationSchema = yup.object().shape({
  parking_slot_type: yup.number().min(1).required().label("Slot type"),
});

interface Props {
  width: number;
  height: number;
  ids: number[];
  parkingId: string;
  callback: () => void;
  onClose: () => void;
  tilesData: ITileDetails[];
  entranceData: ITilesEntranceDetails[];
}

function AddParkingSLot({
  ids,
  onClose,
  parkingId,
  callback,
  tilesData,
  entranceData,
  height,
  width,
}: Props): JSX.Element {
  const [submitForm, isLoading] = useAddParkingSlots(parkingId);
  const [{ data }] = useGetParkingSlotTypes<ISlotTypesData>();
  const toastError = useErrorToast();
  return (
    <Formik
      initialValues={{
        parking_slot_type: "",
      }}
      onSubmit={async ({ parking_slot_type }) => {
        try {
          const distance = await formatAndGetDistance(
            ids,
            entranceData,
            tilesData,
            width,
            height
          );
          const payload = {
            parking_slot_type,
            distance,
          };
          await submitForm(payload);
          onClose();
          callback();
        } catch (err) {
          toastError(err);
        }
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <h1 className="font-semibold text-sm text-red-500">
            *Please select parking slot type*
          </h1>
          <Field
            label="Parking slot type"
            name="parking_slot_type"
            options={data?.map((dt) => ({
              value: dt.id,
              label: dt.vehicle_size,
            }))}
            component={FormSelect}
          />
          <FormButtons isLoading={isLoading} onClose={onClose} />
        </Form>
      )}
    </Formik>
  );
}

export default AddParkingSLot;
