import { getImageUrl } from "@/actions/getImageUrl";
import { useSupportTicketResponse } from "@/lib/features/support-ticket -responses/supportTicketResponsesSelector";
import { postSupportTicketResponse } from "@/lib/features/support-ticket -responses/supportTicketResponsesThunks";
import { useSupportTicket } from "@/lib/features/support-ticket/supportTicketSelector";
import { fetchSupportTicketById, updateSupportTicketStatus } from "@/lib/features/support-ticket/supportTicketThunks";
import { useAppDispatch } from "@/lib/hook";
import { FileImageOutlined, SendOutlined } from "@ant-design/icons";
import { Chip } from "@mui/material";
import { Eye } from "@phosphor-icons/react";
import { Avatar, Button, Image, Input, Row, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../../locales/client";
import { supportTicketStatus } from "../../utils/supportTicketConst";

const { Title, Text } = Typography;

const SupportTicketDetails = ({ support_ticket_id }: { support_ticket_id: any }) => {
  const dispatch = useAppDispatch();
  const tSupportTicket = useScopedI18n("supportTicket");

  const { currentSupportTicket, updateSupportTicketSuccess, updateSupportTicketError } = useSupportTicket();
  const { addSupportTicketResponseSuccess } = useSupportTicketResponse();

  const [newMessage, setNewMessage] = useState("");
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchSupportTicketById(support_ticket_id));
  }, [support_ticket_id, addSupportTicketResponseSuccess]);


  useEffect(() => {
    if (updateSupportTicketSuccess || updateSupportTicketError) {
      dispatch(fetchSupportTicketById(support_ticket_id));
    }
  }, [updateSupportTicketSuccess, updateSupportTicketError]);

  const handleSendMessage = () => {
    const newSupportTicketResponse = {
      support_ticket_id: support_ticket_id,
      message: newMessage,
    };
    // Reset the input field after sending the message
    setNewMessage("");
    dispatch(postSupportTicketResponse(newSupportTicketResponse));
  };

  const handleToggleStatus = () => {
    const newStatus = currentSupportTicket?.status === "open" ? "closed" : "open";
    dispatch(updateSupportTicketStatus({
      support_ticket_id: support_ticket_id,
      status: newStatus
    }));
  };

  // Helper function to get initials from first name
  const getInitials = (firstName: string) => {
    return firstName?.charAt(0)?.toUpperCase() || "U";
  };

  // Helper function to get full name
  const getFullName = (user: any) => {
    return `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username || "Unknown";
  };
  const defaultImagePath = "/images/logo_service.png";
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined); // default fallback

  useEffect(() => {
    const resolveImage = async () => {
      if (!currentSupportTicket?.image) return;
      if (currentSupportTicket?.image.startsWith("http")) {
        setImageUrl(currentSupportTicket?.image);
      } else if (currentSupportTicket?.image.startsWith("/images/")) {
        setImageUrl(currentSupportTicket?.image);
      }
      else {
        try {
          const res = await getImageUrl(currentSupportTicket?.image);
          if (res) {
            setImageUrl(res);
          }
          else {
            setImageUrl(defaultImagePath);
          }
        } catch (err) {
          setImageUrl(defaultImagePath);
          console.error("Failed to fetch image URL", err);
        }
      }
    };

    resolveImage();
  }, [currentSupportTicket?.image]);

  return (
    <div>
      {currentSupportTicket !== undefined && (
        <div>
          {/* Header */}
          <div
            style={{
              marginBottom: 16,
              justifyContent: "space-between",
              gap: "10px",
              alignItems: "center",
              flexDirection: "row",
              display: "flex",
            }}
          >
            <div style={{
              gap: "10px",
              alignItems: "center",
              flexDirection: "row",
              display: "flex",
            }}>
              <Title level={4} style={{ color: "white", margin: 0 }}>
                {currentSupportTicket.title}
              </Title>
              <Chip label={tSupportTicket(currentSupportTicket.status as "open" | "closed")}
                style={{
                  color: supportTicketStatus[currentSupportTicket.status as "open" | "closed"],
                  borderColor: supportTicketStatus[currentSupportTicket.status as "open" | "closed"],
                  borderRadius: "10px",
                  borderWidth: "3px",
                  height: "24px",
                  minWidth: '40px',
                  fontSize: "14px",
                  marginLeft: "8px"
                }}
                variant="outlined"
              />
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Button
                size="large"
                onClick={handleToggleStatus}
                style={{
                  backgroundColor: currentSupportTicket.status === "open" ? "#dc3545" : "#28a745",
                  borderColor: currentSupportTicket.status === "open" ? "#dc3545" : "#28a745",
                  color: "white",
                  borderRadius: "4px",
                  minWidth: "100px",
                }}
              >
                {currentSupportTicket.status === "open"
                  ? tSupportTicket("close")
                  : tSupportTicket("reopen")}
              </Button>
            </div>
          </div>

          {/* Ticket Info */}
          <div
            style={{
              background: "#2a2b30",
              padding: 16,
              borderRadius: 8,
              marginBottom: 24,
            }}
          >
            <Text strong>
              {currentSupportTicket.subscription !== undefined &&
                currentSupportTicket.subscription !== null
                ? currentSupportTicket.subscription.name
                : ""}
            </Text>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <div style={{ flex: 1 }}>
                <Text style={{ color: "#ddd" }}>{currentSupportTicket.description}</Text>
              </div>
            </div>
          </div>

          {/* Uploaded Image - Display before message input */}
          {currentSupportTicket.image && (
            <div
              style={{
                background: "#2a2b30",
                padding: 16,
                borderRadius: 8,
                marginBottom: 24,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                <FileImageOutlined style={{ color: "orange", fontSize: 18, marginRight: 8 }} />

              </div>

              {imageLoading && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                  }}
                >
                  <Spin />
                </div>
              )}
              <Image
                src={imageUrl}
                alt="Support ticket attachment"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  borderRadius: 4,
                  display: "block",
                }}
                preview={{
                  mask: <div style={{ fontSize: 12 }}>
                    <Eye style={{ marginRight: 4 }} />
                  </div>,
                }}
                onLoad={() => setImageLoading(false)}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
              />
            </div>
          )}

          {/* Message Input */}
          <div
            style={{
              background: "#2a2b30",
              padding: 16,
              borderRadius: 8,
              marginBottom: 24,
            }}
          >
            <Input
              disabled={currentSupportTicket.status === "closed"}
              placeholder="Message"
              value={newMessage}
              suffix={
                <SendOutlined style={{ color: "orange" }} onClick={() => handleSendMessage()} />
              }
              style={{ backgroundColor: "#1e1f23", color: "white" }}
              onChange={(e) => setNewMessage(e.target.value)}
              onPressEnter={handleSendMessage}
            />
          </div>

          {/* Messages */}
          <div style={{ padding: "0 8px" }}>
            {[...currentSupportTicket.responses_with_details].reverse().map((msg, index) => {
              const isTicketCreator = msg.created_by?.id === currentSupportTicket.created_by_fk;
              const userName = getFullName(msg.created_by);
              const userInitial = getInitials(msg.created_by?.first_name);

              return (
                <Row
                  key={index}
                  justify={isTicketCreator ? "start" : "end"}
                  style={{ marginBottom: 16 }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isTicketCreator ? "row" : "row-reverse",
                      alignItems: "flex-start",
                      maxWidth: "70%",
                    }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: "transparent",
                        color: isTicketCreator ? "orange" : "skyblue",
                        border: `2px solid ${isTicketCreator ? "orange" : "skyblue"}`,
                        margin: isTicketCreator ? "0 8px 0 0" : "0 0 0 8px",
                        flexShrink: 0,
                      }}
                    >
                      {userInitial}
                    </Avatar>
                    <div>
                      <Text
                        style={{
                          color: "#999",
                          fontSize: "12px",
                          display: "block",
                          marginBottom: 4,
                          textAlign: isTicketCreator ? "left" : "right",
                        }}
                      >
                        {userName}
                      </Text>
                      <div
                        style={{
                          background: !isTicketCreator ? "#2a2b30" : "rgb(99, 74, 54)",
                          padding: 12,
                          borderRadius: 8,
                          color: "#ccc",
                        }}
                      >
                        {msg.message}
                      </div>
                    </div>
                  </div>
                </Row>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTicketDetails;