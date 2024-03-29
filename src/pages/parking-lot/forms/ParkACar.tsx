import { Checkbox } from "@chakra-ui/react";
import FormButtons from "components/FormButtons";
import FormInput from "components/FormInput";
import FormSelect from "components/FormSelect";
import { Field, Form, Formik } from "formik";
import get from "lodash/get";
import moment from "moment";
import { useMemo } from "react";
import * as yup from "yup";
import AvailableSlotDetails from "../components/AvailableSlotDetails";
import {
  useGetNearestDistance,
  useGetParkingSlotTypes,
  useParkCar,
} from "../hooks";
import { ISlotTypesData, ITilesEntranceDetails } from "../interface";

const INIT_FORM = {
  entry_id: "",
  vehicle_type: "",
  plate_number: "",
  date: "",
  time: "",
  useCurrentDateTime: false,
};

const validationSchema = yup.object().shape({
  entry_id: yup.number().required().label("Entry point"),
  vehicle_type: yup.number().required().label("Vehicle type"),
  plate_number: yup.string().max(6).required().label("Plate number"),
  date: yup.date().required().nullable().label("Entry Date"),
  time: yup.string().required().nullable().label("Entry Time"),
});

interface Props {
  onClose: () => void;
  entraceData: ITilesEntranceDetails[];
  parkingId: string;
}

function ParkACar({ onClose, entraceData, parkingId }: Props): JSX.Element {
  const [{ data }] = useGetParkingSlotTypes<ISlotTypesData>();
  const [parkCar, isLoading] = useParkCar(parkingId);
  const [getNearest, , { data: res }] = useGetNearestDistance(parkingId);
  const nearestParkingSlot = useMemo(() => get(res, "data", null), [res]);
  return (
    <div>
      <Formik
        initialValues={INIT_FORM}
        onSubmit={async (value) => {
          try {
            await parkCar({
              ...value,
              tile_id: nearestParkingSlot?.tile_id,
              datetime_in: `${value?.date} ${value?.time}`,
            });
            onClose();
          } catch (_e) {
            // catch error here
          }
        }}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <Field
              component={FormSelect}
              label="Entry Point"
              name="entry_id"
              options={entraceData?.map((dt) => ({
                value: dt.id,
                label: dt.name,
              }))}
              onChangeCallback={async (val: number) => {
                if (val && values.vehicle_type)
                  await getNearest({
                    entryId: val,
                    vehicleTypeId: values?.vehicle_type,
                  });
              }}
            />
            <Field
              component={FormSelect}
              label="Vehicle Type"
              name="vehicle_type"
              options={data?.map((dt) => ({
                value: dt.id,
                label: dt.vehicle_size,
              }))}
              onChangeCallback={async (val: number) => {
                if (val && values.entry_id)
                  await getNearest({
                    entryId: values?.entry_id,
                    vehicleTypeId: val,
                  });
              }}
            />
            <Field
              component={FormInput}
              name="plate_number"
              label="Plate Number"
            />

            <Field
              type="date"
              component={FormInput}
              name="date"
              label="Entry Date"
              disabled={values?.useCurrentDateTime}
            />
            <Field
              type="time"
              component={FormInput}
              name="time"
              label="Entry Time"
              disabled={values?.useCurrentDateTime}
            />
            <Checkbox
              onChange={({ target: { checked } }) => {
                if (checked) {
                  setFieldValue("date", moment().format("YYYY-MM-DD"));
                  setFieldValue("time", moment().format("HH:mm"));
                  // do something
                }
                setFieldValue("useCurrentDateTime", checked);
              }}
            >
              Use current date &amp; time
            </Checkbox>
            {nearestParkingSlot && (
              <AvailableSlotDetails data={nearestParkingSlot} />
            )}
            <FormButtons
              isLoading={isLoading}
              onClose={onClose}
              disabled={!nearestParkingSlot || isLoading}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ParkACar;
