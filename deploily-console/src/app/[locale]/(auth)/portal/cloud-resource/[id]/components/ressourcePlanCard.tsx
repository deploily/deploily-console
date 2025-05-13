import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

export default function RessourcePlanCard() {
    return (
        <Card
            bordered={false}
            style={{
                width: 280,
                background: '#1a1a1a',
                color: 'white',
                textAlign: 'center',
                borderRadius: 12,
                padding: 20,
            }}
        >
            <Title level={4} style={{ color: 'white', marginBottom: 20 }}>
                Level 1 BASIC
            </Title>

            <div
                style={{
                    background: 'linear-gradient(to right, #cccccc, #cc4400)',
                    display: 'inline-block',
                    padding: '10px 20px',
                    borderRadius: 30,
                    marginBottom: 20,
                    fontWeight: 'bold',
                    color: 'white',
                }}
            >
                <span style={{ fontSize: 18, marginRight: 8 }}>5%</span>
                <span style={{ fontSize: 16 }}>Special Offer</span>
            </div>

            <div style={{ marginTop: 10 }}>
                <Text
                    delete
                    style={{
                        color: '#999999',
                        fontSize: 16,
                        display: 'block',
                        marginBottom: 4,
                    }}
                >
                    1000 DZD/Month
                </Text>
                <Title level={3} style={{ color: '#ff7733', margin: 0 }}>
                    950 DZD/Month
                </Title>
            </div>
        </Card>
    );
};

