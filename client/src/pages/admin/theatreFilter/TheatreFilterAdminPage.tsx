import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { Table, Spin, Alert, Space, Popconfirm, Button } from "antd";
import {
  fetchTheatreFilter,
  deleteTheaterFilter,
} from "../../../redux/features/theaterfilterslice";
import { ChildrenTheatreType } from "../../../types/type";
import { toast } from "react-toastify";

const TheatreFilterAdminPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theaterFilter, status, error } = useSelector(
    (state: RootState) => state.theaterFilters
  );

  useEffect(() => {
    dispatch(fetchTheatreFilter());
  }, [dispatch]);

  const handleDelete = (theaterId: string) => {
    dispatch(deleteTheaterFilter(theaterId))
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
      title: "Activity Name",
      dataIndex: "name",
      key: "name",
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
        dataSource={theaterFilter}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

export default TheatreFilterAdminPage;
