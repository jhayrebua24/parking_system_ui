import { useFormikContext } from "formik";

function Debug(): JSX.Element {
  const props = useFormikContext();
  return (
    <pre
      style={{
        background: "#f6f8fa",
        fontSize: ".65rem",
        padding: ".5rem",
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  );
}

export default Debug;
