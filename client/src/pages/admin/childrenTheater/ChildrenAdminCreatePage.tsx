import { Button, Form, Input, TimePicker, Upload, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../redux/store";
import { createChildrenTheatre } from "../../../redux/features/childrentheatreslice";
import { fetchActivityFilter } from "../../../redux/features/activityfilterslice";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import dayjs from "dayjs";

const ChildrenAdminCreatePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState<UploadFile[]>([]);

  useEffect(() => {
    dispatch(fetchActivityFilter());
  }, [dispatch]);

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
      imageList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("image", file.originFileObj);
        }
      });

      await dispatch(createChildrenTheatre(formData)).unwrap();
      message.success("Theatre başarıyla oluşturuldu");
      navigate("/admin/children");
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
          label="Children Name"
          name="name"
          rules={[{ required: true, message: "Lütfen theatre adını giriniz!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Children Description"
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

        <Form.Item label="Children Images">
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

export default ChildrenAdminCreatePage;
