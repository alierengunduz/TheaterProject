import { Button, Form, Input, Spin, message, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  fetchActivityFilter,
  createActivityFilter,
} from "../../../redux/features/activityfilterslice";

const ActivityFilterAdminCreatePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { status, error } = useSelector(
    (state: RootState) => state.activityFilters
  );

  useEffect(() => {
    dispatch(fetchActivityFilter());
  }, [dispatch]);

  if (status === "loading") {
    return <Spin />;
  }

  if (status === "failed") {
    return <Alert message="Error" description={error} type="error" />;
  }

  const onFinish = async (values: any) => {
    try {
      // FormData yerine JSON yapısı kullanalım
      await dispatch(createActivityFilter({ name: values.name })).unwrap();
      message.success("Activity Filter başarıyla oluşturuldu");
      navigate("/admin/activityfilter");
    } catch (error) {
      console.error("Activity Filter oluşturulurken hata:", error);
      message.error("Activity Filter oluşturma başarısız oldu");
    }
  };

  return (
    <div>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Activity Filter Name"
          name="name"
          rules={[
            { required: true, message: "Lütfen activity adını giriniz!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Activity Oluştur
        </Button>
      </Form>
    </div>
  );
};

export default ActivityFilterAdminCreatePage;
