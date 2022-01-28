import { CircularProgress } from "@chakra-ui/react";

function Loader(): JSX.Element {
  return (
    <div
      className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-gray-200 bg-opacity-50"
      style={{
        zIndex: 999999,
      }}
    >
      <CircularProgress isIndeterminate color="brand.500" />
    </div>
  );
}

export default Loader;
