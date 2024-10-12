import { Button, Form, Input, Spin, message, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  fetchTheatreFilter,
  createTheatreFilter,
} from "../../../redux/features/theaterfilterslice";

const TheatreFilterAdminCreatePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { status, error } = useSelector(
    (state: RootState) => state.theaterFilters
  );

  useEffect(() => {
    dispatch(fetchTheatreFilter());
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
      await dispatch(createTheatreFilter({ name: values.name })).unwrap();
      message.success("Theatre Filter başarıyla oluşturuldu");
      navigate("/admin/theatrefilter");
    } catch (error) {
      console.error("Theatre Filter oluşturulurken hata:", error);
      message.error("Theatre Filter oluşturma başarısız oldu");
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
          label="Theatre Filter Name"
          name="name"
          rules={[
            { required: true, message: "Lütfen theatre filter adını giriniz!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Theatre Filter Oluştur
        </Button>
      </Form>
    </div>
  );
};

export default TheatreFilterAdminCreatePage;
