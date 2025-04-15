import React, { useEffect, useState } from 'react';
import { Input, Typography, Avatar, Row } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/lib/hook';
import { fetchSupportTicketById } from '@/lib/features/support-ticket/supportTicketThunks';
import { useSupportTicket } from '@/lib/features/support-ticket/supportTicketSelector';
import { postSupportTicketResponse } from '@/lib/features/support-ticket -responses/supportTicketResponsesThunks';
import { useSupportTicketResponse } from '@/lib/features/support-ticket -responses/supportTicketResponsesSelector';
import { useScopedI18n } from '../../../../../../../../locales/client';
import { supportTicketStatus } from '../../utils/supportTicketConst';

const { Title, Text } = Typography;


const SupportTicketDetails = ({ support_ticket_id }: { support_ticket_id :any}) => {
    const dispatch = useAppDispatch();
    const tSupportTicket = useScopedI18n("supportTicket");
    
    const {currentSupportTicket} = useSupportTicket()
    const { addSupportTicketResponseSuccess } = useSupportTicketResponse()

    const [newMessage, setNewMessage] = useState("")

    useEffect(() => {
        dispatch(fetchSupportTicketById(support_ticket_id))
    }, [support_ticket_id, addSupportTicketResponseSuccess])


    const handleSendMessage = () => {
        const newSupportTicketResponse = {
            support_ticket_id: support_ticket_id,
            message: newMessage};
            // Reset the input field after sending the message
            setNewMessage("");
        dispatch(postSupportTicketResponse(newSupportTicketResponse))
    }

    return (

        <div>
            {currentSupportTicket!==undefined&&<div>
            {/* Header */}
                <div style={{ marginBottom: 16, justifyContent: "space-between", gap: "10px", alignItems: 'center' , flexDirection: "row",
                     display: "flex"}}>
                <Title level={4} style={{ color: 'white', margin: 0 }}>
                {currentSupportTicket.title}
                </Title>
                    <Text strong style={{ color: supportTicketStatus[currentSupportTicket.status as "open" | "closed"], float: 'right' }}>
                        {tSupportTicket(currentSupportTicket.status as "open" | "closed")}
                </Text>
                </div>

            {/* Ticket Info */}
            <div
                style={{
                    background: '#2a2b30',
                    padding: 16,
                    borderRadius: 8,
                    marginBottom: 24,
                }}
            >
                    <Text strong>{currentSupportTicket.subscription !== undefined && currentSupportTicket.subscription !== null ?currentSupportTicket.subscription.name:""}</Text>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <div style={{ flex: 1 }}>
                        <Text style={{ color: '#ddd' }}>
                            {currentSupportTicket.description}
                        </Text>
                    </div>
                </div>
            </div>

            {/* Message Input */}
            <div
                style={{
                    background: '#2a2b30',
                    padding: 16,
                    borderRadius: 8,
                    marginBottom: 24,
                }}
            >
                <Input
                    placeholder="Message"
                    value={newMessage}
                    suffix={<SendOutlined style={{ color: 'orange' }} onClick={()=>handleSendMessage()}/>}
                    style={{ backgroundColor: '#1e1f23', color: 'white' }}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
            </div>

            {/* Messages */}
            <div style={{ padding: '0 8px' }}>
                    {[...currentSupportTicket.support_ticket_responses].reverse().map((msg, index) => (
                    <Row
                        key={index}
                        justify={msg.created_by === 'user' ? 'start' : 'end'}
                        style={{ marginBottom: 16 }}
                    >
                            {msg.created_by === 'user' && (
                            <Avatar
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'orange',
                                    border: '2px solid orange',
                                    marginRight: 8,
                                }}
                                icon={<UserOutlined />}
                            />
                        )}
                        <div
                            style={{
                                    background: msg.created_by === 'user' ? '#2a2b30' : '#3a3b40',
                                padding: 12,
                                borderRadius: 8,
                                color: '#ccc',
                                maxWidth: '60%',
                            }}
                        >
                            {msg.message}
                        </div>
                            {msg.created_by === 'support' && (
                            <Avatar
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'skyblue',
                                    border: '2px solid skyblue',
                                    marginLeft: 8,
                                }}
                                icon={<UserOutlined />}
                            />
                        )}
                    </Row>
                ))}
            </div>
        </div>}
        </div>
    );
};

export default SupportTicketDetails;
