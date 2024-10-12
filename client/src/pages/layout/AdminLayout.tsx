import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  RollbackOutlined,
  BarcodeOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const { Sider, Header, Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const getUserRole = () => {
    return user ? user.role : null;
  };
  const userRole = getUserRole();
  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => {
        navigate(`/admin`);
      },
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Activitity Filter",
      path: "/",
      children: [
        {
          key: "3",
          label: "Activity List",
          path: "/admin/activityfilter",
          onClick: () => {
            navigate(`/admin/activityfilter`);
          },
        },
        {
          key: "4",
          label: "Create Activity Filter",
          path: "/admin/activityfilter/create",
          onClick: () => {
            navigate("/admin/activityfilter/create");
          },
        },
      ],
    },
    {
      key: "5",
      icon: <LaptopOutlined />,
      label: "Theatre",
      path: "/",
      children: [
        {
          key: "6",
          label: "Theatre List",
          path: "/admin/theatre",
          onClick: () => {
            navigate(`/admin/theatre`);
          },
        },
        {
          key: "7",
          label: "Create Theatre",
          path: "/admin/theatre/create",
          onClick: () => {
            navigate("/admin/theatre/create");
          },
        },
      ],
    },
    {
      key: "8",
      icon: <LaptopOutlined />,
      label: "Activity Theatre",
      path: "/",
      children: [
        {
          key: "9",
          label: "Activity Theatre List",
          path: "/admin/activity",
          onClick: () => {
            navigate(`/admin/activity`);
          },
        },
        {
          key: "10",
          label: "Create Activity Theatre",
          path: "/admin/activity/create",
          onClick: () => {
            navigate("/admin/activity/create");
          },
        },
      ],
    },
    {
      key: "11",
      icon: <LaptopOutlined />,
      label: "Children Theatre",
      path: "/",
      children: [
        {
          key: "12",
          label: "Children Theatre List",
          path: "/admin/children",
          onClick: () => {
            navigate(`/admin/children`);
          },
        },
        {
          key: "13",
          label: "Create Children Theatre",
          path: "/admin/children/create",
          onClick: () => {
            navigate("/admin/children/create");
          },
        },
      ],
    },
    {
      key: "14",
      icon: <LaptopOutlined />,
      label: "Actor",
      path: "/",
      children: [
        {
          key: "15",
          label: "Actor List",
          path: "/admin/actor",
          onClick: () => {
            navigate(`/admin/actor`);
          },
        },
        {
          key: "16",
          label: "Create Actor",
          path: "/admin/actor/create",
          onClick: () => {
            navigate("/admin/actor/create");
          },
        },
      ],
    },
    {
      key: "17",
      icon: <LaptopOutlined />,
      label: "Theatre Filter",
      path: "/",
      children: [
        {
          key: "18",
          label: "Theatre Filter List",
          path: "/admin/theatrefilter",
          onClick: () => {
            navigate(`/admin/theatrefilter`);
          },
        },
        {
          key: "19",
          label: "Theatre Filter Create",
          path: "/admin/theatrefilter/create",
          onClick: () => {
            navigate("/admin/theatrefilter/create");
          },
        },
      ],
    },

    {
      key: "20",
      icon: <RollbackOutlined />,
      label: "Ana Sayfaya Git",
      onClick: () => {
        window.location.href = "/";
      },
    },
  ];

  if (userRole === "admin") {
    return (
      <div className="admin-layout">
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider width={200} theme="dark">
            <Menu
              mode="vertical"
              style={{
                height: "100%",
              }}
              items={menuItems}
            />
          </Sider>
          <Layout>
            <Header>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                }}
              >
                <h2>Admin Paneli</h2>
              </div>
            </Header>
            <Content>
              <div
                className="site-layout-background"
                style={{
                  padding: "24px 50px",
                  minHeight: 360,
                }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  } else {
    return (window.location.href = "/");
  }
};

export default AdminLayout;
