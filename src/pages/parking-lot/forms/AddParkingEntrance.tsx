/* eslint-disable @typescript-eslint/no-unused-vars */
import FormButtons from "components/FormButtons";
import FormInput from "components/FormInput";
import * as yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";
import { useAddEntrances } from "../hooks";

// validation
const validationSchema = yup.object().shape({
  tile_ids: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().max(10).min(0).required().label("Name"),
        id: yup.number().required(),
      })
    )
    .min(1),
});

interface Props {
  ids: number[];
  parkingId: string;
  callback: () => void;
  onClose: () => void;
}

function AddParkingEntrance({
  ids,
  onClose,
  parkingId,
  callback,
}: Props): JSX.Element {
  const [submitForm, isLoading] = useAddEntrances(parkingId);
  return (
    <Formik
      initialValues={{
        tile_ids: ids.map((id) => ({
          name: "",
          id,
        })),
      }}
      onSubmit={async (value) => {
        try {
          await submitForm(value);
          onClose();
          callback();
        } catch (_e) {
          //
        }
      }}
      validationSchema={validationSchema}
    >
      {({ values, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <h1 className="font-semibold text-sm text-red-500">
            *Please input name for your parking entry*
          </h1>
          <FieldArray name="ids">
            {() => (
              <div className="w-full flex flex-col space-y-3">
                {values.tile_ids.map((_dt, index) => (
                  <Field
                    key={`tile_ids_${index + 1}_name`}
                    label="Entry name"
                    name={`tile_ids.${index}.name`}
                    component={FormInput}
                  />
                ))}
              </div>
            )}
          </FieldArray>
          <FormButtons isLoading={isLoading} onClose={onClose} />
        </Form>
      )}
    </Formik>
  );
}

export default AddParkingEntrance;
