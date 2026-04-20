// import { useI18n } from "../../../../../../../locales/client";

import { Plus } from "@phosphor-icons/react";
import { Button, Form, Input, message, Row, Select, Typography, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useScopedI18n } from "../../../../../../../../locales/client";

import { SubscriptionInterface } from "@/lib/features/subscriptions/subscriptionInterface";
import { useSubscriptionList } from "@/lib/features/subscriptions/subscriptionSelectors";
import { fetchSubscription } from "@/lib/features/subscriptions/subscriptionThunks";
import { useSupportTicket } from "@/lib/features/support-ticket/supportTicketSelector";
import { postSupportTicket, uploadSupportTicketImage } from "@/lib/features/support-ticket/supportTicketThunks";
import { useAppDispatch } from "@/lib/hook";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const { Option } = Select;

export default function CreateSupportTicket() {
  const t = useScopedI18n("createSupportTicket");
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { subscriptionResponse } = useSubscriptionList();
  const { addSupportTicketSuccess, addSupportTicketError } = useSupportTicket();
  const [messageApi] = message.useMessage();
  const router = useRouter();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null); // Store the actual File object

  useEffect(() => {
    dispatch(fetchSubscription());
  }, []);

  useEffect(() => {
    if (addSupportTicketSuccess) {
      messageApi.open({
        type: "success",
        content: "Support ticket created successfully!",
      });
    }

    if (addSupportTicketError) {
      messageApi.open({
        type: "error",
        content: "Failed to create support ticket!",
      });
    }
  }, [addSupportTicketSuccess, addSupportTicketError]);

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      setFileList([]);
      setImageFile(null);
    },
    beforeUpload: (file) => {
      // Validate file type (images only)
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        messageApi.error('You can only upload image files!');
        return false;
      }

      // Validate file size (optional, e.g., max 5MB)
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        messageApi.error('Image must be smaller than 5MB!');
        return false;
      }

      console.log('File selected:', file);

      // Store the actual File object
      setImageFile(file as File);
      setFileList([file]);

      return false; // Prevent automatic upload
    },
    fileList,
    maxCount: 1,
  };

  const onFinish = async (values: any) => {
    setUploading(true);

    try {
      console.log('Starting ticket creation...', values);
      console.log('Image file to upload:', imageFile);

      // First, create the support ticket
      const resultAction = await dispatch(
        postSupportTicket({
          subscription_id: values.subscription,
          title: values.subject,
          description: values.description,
          status: "open",
        }),
      );

      console.log('Ticket created successfully:', resultAction);

      // Check different possible locations for ticket ID
      const ticketId = resultAction?.payload.id || resultAction?.payload.data?.id || resultAction?.payload.result?.id;

      console.log('Ticket ID:', ticketId);
      console.log('Has image file:', !!imageFile);

      // If there's an image and we have a ticket ID, upload it
      if (imageFile && ticketId) {
        console.log('Uploading image for ticket:', ticketId);
        console.log('Image file details:', {
          name: imageFile.name,
          type: imageFile.type,
          size: imageFile.size
        });

        try {
          const uploadResult = await dispatch(
            uploadSupportTicketImage({
              supportTicketId: ticketId,
              imageFile: imageFile,
            }),
          ).unwrap();

          console.log('Image uploaded successfully:', uploadResult);
          messageApi.success("Support ticket created with image!");
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          messageApi.warning("Ticket created but image upload failed!");
        }
      } else {
        if (!ticketId) {
          console.error('No ticket ID found in response');
        }
        messageApi.success("Support ticket created successfully!");
      }

      // Reset form and navigate
      form.resetFields();
      setFileList([]);
      setImageFile(null);

      setTimeout(() => {
        router.back();
      }, 1000);

    } catch (error) {
      console.error('Error creating ticket:', error);
      messageApi.error("Failed to create support ticket!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Title level={3} style={{ fontWeight: 700, color: "#ffff" }}>
        {t("title")}
      </Title>

      <Typography style={{ marginBlock: 30, fontSize: 16 }}>{t("typography")}</Typography>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="subscription" rules={[{ required: true, message: "Please select a subscription" }]}>
          <Select
            allowClear
            style={{ width: "100%", height: 40 }}
            placeholder={t("selectSubscription")}
          >
            {subscriptionResponse !== undefined
              ? subscriptionResponse?.result?.map((value: SubscriptionInterface) => (
                <Option key={value.id} value={value.id}>
                  {value.service_details.name} / {value.name}
                </Option>
              ))
              : null}
          </Select>
        </Form.Item>
        <Form.Item name="subject" rules={[{ required: true, message: "Please enter a subject" }]}>
          <Input
            allowClear
            placeholder={t("subject")}
            style={{ marginBlock: 20, height: 40, borderRadius: 0 }}
          />
        </Form.Item>
        <Form.Item name="description" rules={[{ required: true, message: "Please enter a description" }]}>
          <TextArea
            style={{ borderRadius: 0 }}
            placeholder={t("description")}
            autoSize={{ minRows: 5, maxRows: 10 }}
          />
        </Form.Item>
        <Form.Item label={t('uploadImageOptional')}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} style={{ color: '#1890ff' }}>
              { t("selectImage")}
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Row style={{ display: "flex", justifyContent: "end" }}>
            <Button
              htmlType="submit"
              loading={uploading}
              disabled={uploading}
              style={{
                color: "#ffff",
                backgroundColor: uploading ? "#cccccc" : "#5394CC",
                padding: 10,
                marginTop: 20,
                borderRadius: 25,
                fontSize: 15,
                height: 45,
              }}
            >
              {!uploading && <Plus size={20} style={{ color: "rgba(220, 233, 245, 0.88)" }} />}
              {uploading ? "Creating..." : t("createTicket")}
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
}