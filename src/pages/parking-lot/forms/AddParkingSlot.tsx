/* eslint-disable @typescript-eslint/no-unused-vars */
import FormButtons from "components/FormButtons";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import FormSelect from "components/FormSelect";
import { useAddEntrances, useGetParkingSlotTypes } from "../hooks";
import { IEntranceDetails, ISlotTypesData, ITileDetails } from "../interface";
import { formatAndGetDistance } from "../helper";

// validation
const validationSchema = yup.object().shape({
  ids: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().max(10).min(0).required().label("Name"),
        id: yup.number().required(),
      })
    )
    .min(0),
});

interface Props {
  width: number;
  height: number;
  ids: number[];
  parkingId: string;
  callback: () => void;
  onClose: () => void;
  tilesData: ITileDetails[];
  entranceData: IEntranceDetails[];
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
  const [submitForm, isLoading] = useAddEntrances(parkingId);
  const [{ data }] = useGetParkingSlotTypes<ISlotTypesData>();
  return (
    <Formik
      initialValues={{
        parking_slot_type: "",
      }}
      onSubmit={async (value) => {
        try {
          const val = await formatAndGetDistance(
            ids,
            entranceData,
            tilesData,
            width,
            height
          );
          console.log(val, "qwewq");
          //   await submitForm(value);
          //   callback();
        } catch (_e) {
          //
          console.log("catch");
        }
      }}
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
