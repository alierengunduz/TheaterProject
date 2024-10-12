import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { Table, Spin, Alert, Space, Popconfirm, Button } from "antd";
import { fetchActivityTheatre } from "../../../redux/features/activitytheatreslice";
import { fetchActivityFilter } from "../../../redux/features/activityfilterslice";
import { ChildrenTheatreType } from "../../../types/type";
import { deleteActivity } from "../../../redux/features/activitytheatreslice";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const ActivityAdminPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activityTheatre, status, error } = useSelector(
    (state: RootState) => state.activityTheatres
  );
  const { activityFilter } = useSelector(
    (state: RootState) => state.activityFilters
  );

  const getTheaterTitle = (theaterId: string) => {
    const theater = activityFilter.find((the) => the._id === theaterId);
    return theater ? theater.name : "Unknown";
  };

  useEffect(() => {
    dispatch(fetchActivityTheatre({ category: "all" }));
    dispatch(fetchActivityFilter());
  }, [dispatch]);

  const handleDelete = (activityId: string) => {
    dispatch(deleteActivity(activityId))
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
      title: "Theatre Category",
      dataIndex: "category",
      key: "category",
      render: (theaterId: string) => getTheaterTitle(theaterId),
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
        dataSource={activityTheatre}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

export default ActivityAdminPage;
