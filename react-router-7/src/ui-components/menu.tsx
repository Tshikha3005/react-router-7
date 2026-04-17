import { Menu as AntMenu } from "antd";

export const Menu = ({ children, ...props }) => {
  return <AntMenu {...props}>{children}</AntMenu>;
};

// You must manually attach these so <Menu.Item> works in App.js
Menu.Item = AntMenu.Item;
Menu.SubMenu = AntMenu.SubMenu;
Menu.ItemGroup = AntMenu.ItemGroup;
Menu.Divider = AntMenu.Divider;
