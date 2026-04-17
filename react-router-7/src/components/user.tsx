import { Link, useParams } from "react-router";

export const User = () => {
  const paramData = useParams();
  return (
    <>
      <p>User Id is: {paramData.id}</p>
      <Link to="/users">Back on Users list</Link>
    </>
  );
};
