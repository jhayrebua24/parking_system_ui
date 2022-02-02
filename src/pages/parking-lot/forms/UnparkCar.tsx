/* eslint-disable radix */
/* eslint-disable func-names */
import { Checkbox } from "@chakra-ui/react";
import Debug from "components/Debug";
import FormButtons from "components/FormButtons";
import FormInput from "components/FormInput";
import { Field, Form, Formik } from "formik";
import moment from "moment";
import get from "lodash/get";
import * as yup from "yup";
import { useParkCar } from "../hooks";
import { IActiveTransactionDetails, ISlotDetails } from "../interface";

const validationSchema = (transactions: IActiveTransactionDetails) =>
  yup.object().shape({
    entry_id: yup.number().required().label("Entry point"),
    vehicle_type: yup.number().required().label("Vehicle type"),
    plate_number: yup.string().max(6).required().label("Plate number"),
    date: yup
      .date()
      .min(
        moment(transactions?.datetime_in?.split(" ")[0]).format("YYYY-MM-DD")
      )
      .required()
      .nullable()
      .label("Exit Date"),
    time: yup
      .string()
      .nullable()
      .required()
      .test("check", "Time must be after entry time", function (val) {
        const { date } = this?.parent;
        const splittedHr = val?.split(":");
        return moment(date)
          .hour(parseInt(get(splittedHr, "0", 0)))
          .minute(parseInt(get(splittedHr, "1", 0)))
          .isAfter(moment(transactions?.datetime_in));
      })
      .label("Exit Time"),
  });

interface Props {
  data: ISlotDetails;
  onClose: () => void;
  parkingId: string;
}

function ParkACar({ onClose, data, parkingId }: Props): JSX.Element {
  const [parkCar, isLoading] = useParkCar(parkingId);
  const { transactions } = data;
  return (
    <div>
      <Formik
        initialValues={{
          txn_id: transactions?.id,
          plate_number: transactions?.plate_number,
          date: "",
          time: "",
          useCurrentDateTime: false,
        }}
        onSubmit={async (value) => {
          try {
            await parkCar({
              ...value,
              datetime_out: `${value?.date} ${value?.time}`,
            });
            onClose();
          } catch (_e) {
            // catch error here
          }
        }}
        validationSchema={validationSchema(transactions)}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <Field
              component={FormInput}
              name="plate_number"
              label="Plate Number"
            />
            <Field
              type="date"
              component={FormInput}
              name="date"
              label="Exit Date"
              disabled={values?.useCurrentDateTime}
            />
            <Field
              type="time"
              component={FormInput}
              name="time"
              label="Exit Time"
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
            <FormButtons
              isLoading={isLoading}
              onClose={onClose}
              disabled={isLoading}
            />
            <Debug />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ParkACar;
