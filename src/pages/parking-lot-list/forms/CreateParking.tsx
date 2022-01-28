import FormButtons from "components/FormButtons";
import FormInput from "components/FormInput";
import FormSelect from "components/FormSelect";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useAddParkingLot } from "../hooks";

interface IProps {
  onClose: () => void;
}

const SelectOpt = [...Array(6)].map((_v, k) => ({
  value: k + 5,
  label: k + 5,
}));

const INIT_VALUE = {
  name: "",
  width: "",
  height: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().min(1).max(20).required().label("Name"),
  width: yup.number().min(5).max(10).required().label("Width"),
  height: yup.number().min(5).max(10).required().label("Height"),
});

function CreateParking({ onClose }: IProps): JSX.Element {
  const [submitForm, isLoading] = useAddParkingLot();
  return (
    <Formik
      initialValues={INIT_VALUE}
      onSubmit={async (value) => {
        try {
          await submitForm(value);
          onClose();
        } catch (_e) {
          //
        }
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <Field label="Name" name="name" component={FormInput} />
          <Field
            label="Width"
            name="width"
            options={SelectOpt}
            component={FormSelect}
          />
          <Field
            options={SelectOpt}
            label="Height"
            name="height"
            component={FormSelect}
          />
          <FormButtons isLoading={isLoading} onClose={onClose} />
        </Form>
      )}
    </Formik>
  );
}

export default CreateParking;
