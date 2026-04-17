import { Layout as AntLayout } from "antd";

export const Layout = ({ children, ...props }) => {
  return <AntLayout {...props}>{children}</AntLayout>;
};

Layout.Header = AntLayout.Header;
Layout.Content = AntLayout.Content;
Layout.Footer = AntLayout.Footer;
Layout.Sider = AntLayout.Sider;
