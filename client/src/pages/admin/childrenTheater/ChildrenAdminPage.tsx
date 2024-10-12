import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { Table, Spin, Alert, Space, Popconfirm, Button } from "antd";
import dayjs from "dayjs";
import {
  fetchChildrenTheatre,
  deleteChildren,
} from "../../../redux/features/childrentheatreslice";
import { ChildrenTheatreType } from "../../../types/type";
import { toast } from "react-toastify";

const ChildrenAdminPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { childrenTheatre, status, error } = useSelector(
    (state: RootState) => state.childrenTheatres
  );

  useEffect(() => {
    dispatch(fetchChildrenTheatre());
  }, [dispatch]);

  const handleDelete = (activityId: string) => {
    dispatch(deleteChildren(activityId))
      .unwrap() // Unwrap ile promise sonucunu bekleyip işlem tamamlandığında işlem yapıyoruz
      .then(() => {
        toast.success("Activity deleted successfully");
      })
      .catch((err) => {
        toast.error("Error deleting activity: " + err.message);
      });
  };

  const columns = [
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (image: string[]) => (
        <img
          src={
            image[0]
              ? `http://localhost:8000/images/${image[0].replace(
                  "uploads/",
                  ""
                )}`
              : ""
          }
          alt="Product"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Theatre Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Theatre Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Theatre süresi",
      dataIndex: "time",
      key: "time",
      render: (time: string) => dayjs(time).format("HH:mm:ss"), // Zamanı HH:mm formatında göster
    },
    {
      title: "Theatre yaş aralığı",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Theatre  Türü",
      dataIndex: "eventtype",
      key: "eventtype",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: ChildrenTheatreType) => (
        <Space>
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (status === "loading") {
    return <Spin />;
  }

  if (status === "failed") {
    return <Alert message="Error" description={error} type="error" />;
  }
  return (
    <div>
      <Table
        bordered
        dataSource={childrenTheatre}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

export default ChildrenAdminPage;
