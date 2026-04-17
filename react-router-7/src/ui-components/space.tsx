import { Space as AntSpace } from "antd";

export const Space = ({ children, ...props }) => {
  return <AntSpace {...props}>{children}</AntSpace>;
};
