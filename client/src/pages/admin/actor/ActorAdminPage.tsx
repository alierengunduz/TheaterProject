import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { Table, Spin, Alert, Space, Popconfirm, Button } from "antd";
import { getAllActor, deleteActor } from "../../../redux/features/actorslice";
import { ChildrenTheatreType } from "../../../types/type";
import { toast } from "react-toastify";

const ActorAdminPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { actor, status, error } = useSelector(
    (state: RootState) => state.actors
  );

  useEffect(() => {
    dispatch(getAllActor());
  }, [dispatch]);

  const handleDelete = (activityId: string) => {
    dispatch(deleteActor(activityId))
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
        dataSource={actor}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

export default ActorAdminPage;
