import { Link } from "react-router-dom";

function Page404(): JSX.Element {
  return (
    <div className="flex flex-grow h-full w-full justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold uppercase">PAGE NOT FOUND!</h1>
        <Link to="/" className="underline text-blue-400 text-sm">
          Back to home page
        </Link>
      </div>
    </div>
  );
}

export default Page404;
