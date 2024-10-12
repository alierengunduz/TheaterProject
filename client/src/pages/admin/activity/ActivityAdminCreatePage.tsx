import {
  Button,
  Form,
  Input,
  Select,
  Spin,
  Upload,
  message,
  Alert,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import { createActivityTheatre } from "../../../redux/features/activitytheatreslice";
import { fetchActivityFilter } from "../../../redux/features/activityfilterslice";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
const { Option } = Select;

const ActivityAdminCreatePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const { activityFilter, status, error } = useSelector(
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

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.fileList.length <= 4) {
      setImageList(info.fileList);
    } else {
      message.error("You can only upload up to 4 images.");
    }
  };

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("age", values.age);
      formData.append("time", values.time);
      formData.append("eventtype", values.eventtype);
      formData.append("category", values.category);
      imageList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("image", file.originFileObj);
        }
      });

      await dispatch(createActivityTheatre(formData)).unwrap();
      message.success("Theatre başarıyla oluşturuldu");
      navigate("/admin/activity");
    } catch (error) {
      console.error("Theatre oluşturulurken hata:", error);
      message.error("Theatre oluşturma başarısız oldu");
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
          label="Activity Name"
          name="name"
          rules={[{ required: true, message: "Lütfen theatre adını giriniz!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Activity Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen theatre açıklamasını giriniz!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Theatre Yaş Oranı"
          name="age"
          rules={[
            {
              required: true,
              message: "Lütfen tiyatro yaş aralığı giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Theatre türünü belirtiniz"
          name="eventtype"
          rules={[
            {
              required: true,
              message: "Lütfen tiyatro türünü belirtiniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Theatre süresini belirtiniz"
          name="time"
          rules={[
            {
              required: true,
              message: "Lütfen tiyatro türünü belirtiniz!",
            },
          ]}
        >
          <TimePicker defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")} />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Lütfen bir tür seçiniz!" }]}
        >
          <Select placeholder="Bir tür seçiniz">
            {activityFilter.map((cat) => (
              <Option key={cat._id} value={cat._id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Product Images">
          <Upload
            listType="picture-card"
            fileList={imageList}
            onChange={handleChange}
            maxCount={4}
            beforeUpload={() => false} // Prevent automatic upload
          >
            {imageList.length < 4 && "+ Upload"}
          </Upload>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Theatre Oluştur
        </Button>
      </Form>
    </div>
  );
};

export default ActivityAdminCreatePage;
