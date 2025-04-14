import React, { useEffect } from 'react';
import { Input, Typography, Avatar, Row } from 'antd';
import { SendOutlined, PictureOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/lib/hook';
import { fetchSupportTicketById } from '@/lib/features/support-ticket/supportTicketThunks';
import { useSupportTicket } from '@/lib/features/support-ticket/supportTicketSelector';

const { Title, Text } = Typography;

const messages = [
    { text: 'Message description Message description...', from: 'user' },
    { text: 'Message description Message description...', from: 'support' },
    { text: 'Message description Message description...', from: 'user' },
    { text: 'Message description Message description...', from: 'support' },
];


const SupportTicketDetails = ({ support_ticket_id }: { support_ticket_id :any}) => {
    const dispatch = useAppDispatch();
    const {currentSupportTicket} = useSupportTicket()

    useEffect(() => {
        dispatch(fetchSupportTicketById(support_ticket_id))
    }, [support_ticket_id])

    return (

        <div>
            {currentSupportTicket!==undefined&&<div>

            {/* Header */}
            <div style={{ marginBottom: 16 }}>
                <Title level={4} style={{ color: 'white', margin: 0 }}>
                {currentSupportTicket.title}
                </Title>
                <Text strong style={{ color: 'limegreen', float: 'right' }}>
                    {currentSupportTicket.status}
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
                <Text strong>Photon</Text>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <div style={{ flex: 1 }}>
                        <Text style={{ color: '#ddd' }}>
                            {currentSupportTicket.description}
                        </Text>
                    </div>
                    <PictureOutlined style={{ fontSize: 32, color: '#888' }} />
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
                    suffix={<SendOutlined style={{ color: 'orange' }} />}
                    style={{ backgroundColor: '#1e1f23', color: 'white' }}
                />
            </div>

            {/* Messages */}
            <div style={{ padding: '0 8px' }}>
                {messages.map((msg, index) => (
                    <Row
                        key={index}
                        justify={msg.from === 'user' ? 'start' : 'end'}
                        style={{ marginBottom: 16 }}
                    >
                        {msg.from === 'user' && (
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
                                background: msg.from === 'user' ? '#2a2b30' : '#3a3b40',
                                padding: 12,
                                borderRadius: 8,
                                color: '#ccc',
                                maxWidth: '60%',
                            }}
                        >
                            {msg.text}
                        </div>
                        {msg.from === 'support' && (
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
