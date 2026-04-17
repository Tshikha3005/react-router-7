import { Button as AntButton } from "antd";

export const Button = ({ children, ...props }) => {
  return (
    <AntButton type="primary" size="middle" {...props}>
      {children}
    </AntButton>
  );
};
