import { Flex } from "antd";
import { Link } from "react-router";

export const Users = () => {
  const userslist = [
    {
      id: 1,
      name: "Shikha",
      age: "29",
    },
    {
      id: 2,
      name: "Mradul",
      age: 30,
    },
    {
      id: 3,
      name: "Rahul",
      age: "23",
    },
  ];
  return (
    <>
      {userslist.map((user, index) => {
        return (
          <Flex justify="flex-start" align="center" key={index}>
            <Link to={`/users/${user.id}`}>
              {" "}
              <h4 className="bg-red-400">{user.name}</h4>
            </Link>{" "}
            : {user.age}
          </Flex>
        );
      })}
    </>
  );
};
