import { Button, Form, Input, Upload, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppDispatch } from "../../../redux/store";
import { createActorTheatre } from "../../../redux/features/actorslice";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";

const ActorAdminCreatePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState<UploadFile[]>([]);

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
      imageList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("image", file.originFileObj);
        }
      });

      await dispatch(createActorTheatre(formData)).unwrap();
      message.success("Actor başarıyla oluşturuldu");
      navigate("/admin/actor");
    } catch (error) {
      console.error("Actor oluşturulurken hata:", error);
      message.error("Actor oluşturma başarısız oldu");
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
          label="Actor Name"
          name="name"
          rules={[{ required: true, message: "Lütfen theatre adını giriniz!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Actor Description"
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

        <Form.Item label="Actor Images">
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

export default ActorAdminCreatePage;
