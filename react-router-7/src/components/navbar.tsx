import { NavLink, Link, Outlet } from "react-router";
import { Menu } from "../ui-components";
import { Flex, Layout } from "antd";
import { Space } from "../ui-components";

const { Header } = Layout;

export const Navbar = () => {
  return (
    <>
      <Header
        style={{
          color: "white",
          fontSize: "24px",
          maxHeight: "64px",
        }}
      >
        <Flex
          justify="space-between"
          style={{ background: "white", width: "100%" }}
        >
          <Space>
            <Link style={{ color: "red" }} to="/">
              Logo
            </Link>
          </Space>
          <Flex>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["home"]}
              style={{
                lineHeight: "64px",
                display: "flex",
                gap: "1rem",
                justify: "center",
                alignItems: "center",
                borderBottom: "none",
              }}
            >
              {/* Wrap labels in Link components so they actually navigate */}
              <Menu.Item key="home">
                <NavLink to="/">Home</NavLink>
              </Menu.Item>
              <Menu.Item key="about">
                <NavLink to="/about">About</NavLink>
              </Menu.Item>
              <Menu.Item key="contact">
                <NavLink to="/contact">Contact</NavLink>
              </Menu.Item>
              <Menu.Item key="users">
                <NavLink to="/users">Users</NavLink>
              </Menu.Item>
              <Menu.Item key="login">
                <NavLink to="/user/login">Login</NavLink>
              </Menu.Item>
              <Menu.Item key="signup">
                <NavLink to="/user/signup">Signup</NavLink>
              </Menu.Item>
            </Menu>
          </Flex>
        </Flex>
      </Header>
      {/* this outlet is for displaying content of the component */}
      <Outlet />
    </>
  );
};
