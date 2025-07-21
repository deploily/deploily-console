"use client";
import { fetchApiServiceSubscription } from '@/lib/features/api-service-subscriptions/apiServiceSubscriptionThunks';
import { useCloudResource } from '@/lib/features/cloud-resource/cloudResourceSelectors';
import { getMyResources } from '@/lib/features/cloud-resource/cloudResourceThunks';
import { useFavoriteServices } from '@/lib/features/favorites/favoriteServiceSelectors';
import { fetchMyFavoriteServices } from '@/lib/features/favorites/favoriteServiceThunks';
import { useMyApplicationList } from '@/lib/features/my-applications/myApplicationSelector';
import { fetchMyApplications } from '@/lib/features/my-applications/myApplicationThunks';
import { useProfile } from '@/lib/features/profile/profileSelectors';
import { getProfile } from '@/lib/features/profile/profileThunks';
import { useSubscription } from '@/lib/features/subscriptions/subscriptionSelectors';
import { useSupportTicket } from '@/lib/features/support-ticket/supportTicketSelector';
import { fetchSupportTicket } from '@/lib/features/support-ticket/supportTicketThunks';
import { useAppDispatch } from '@/lib/hook';
import {
    CalendarOutlined,
    DollarOutlined,
    QuestionCircleOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd';
import { useEffect } from 'react';
import PaymentsListContainer from './payments_components';


//TODO add translate & update color of table 
export default function DashboardContainer() {

    const dispatch = useAppDispatch();
    const { currentProfile } = useProfile();
    const { myResourcesResponse } = useCloudResource();
    const { supportTicketList } = useSupportTicket()
    const { favoriteServicesList } = useFavoriteServices();
    const { subscriptionResponse } = useSubscription();
    const { MyApplicationList } = useMyApplicationList()




    useEffect(() => {
        dispatch(getProfile());
        dispatch(getMyResources());
        dispatch(fetchSupportTicket());
        dispatch(fetchMyFavoriteServices());
        dispatch(fetchApiServiceSubscription());
        dispatch(fetchMyApplications());

    }, [dispatch]);


    const applicationsCount = MyApplicationList?.result?.length || 0;
    const apiServicesCount = subscriptionResponse?.result?.length || 0;
    const favoritesCount = favoriteServicesList?.result?.length || 0;
    const supportTicketsCount = supportTicketList?.result?.length || 0;
    const affiliationCount = myResourcesResponse?.length || 0;
    const { Title, Text } = Typography;


    const stats = [
        {
            title: 'APi Services',
            value: apiServicesCount,
            icon: <DollarOutlined style={{ fontSize: 30, color: '#fff' }} />,
            color: '#5394CC',
        },
        {
            title: 'Application',
            value: applicationsCount,
            icon: <DollarOutlined style={{ fontSize: 30, color: '#fff' }} />,
            color: '#5394CC',
        },
        {
            title: 'Favorites',
            value: favoritesCount,
            icon: <CalendarOutlined style={{ fontSize: 30, color: '#fff' }} />,
            color: '#DD8859',
        },
        {
            title: 'Support Tickets',
            value: supportTicketsCount,
            icon: <QuestionCircleOutlined style={{ fontSize: 30, color: '#fff' }} />,
            color: '#0099CC',
        },
        {
            title: 'Affiliations',
            value: affiliationCount,
            icon: <TeamOutlined style={{ fontSize: 30, color: '#fff' }} />,
            color: '#FF9933',
        },
    ];

    return (
        <div style={{ padding: '24px', minHeight: '100vh' }}>
            {currentProfile && (<Title level={3} style={{ color: '#fff' }}>
                👋 Welcome back, {currentProfile.first_name}!
            </Title>)
            }
            <Text style={{ color: '#ccc' }}>Your current stats at glance</Text>

            <Row gutter={[16, 16]} style={{ marginTop: 24 }} wrap>
                {stats.map((stat) => (
                    <Col flex="20%" key={stat.title}>
                        <Card
                            style={{
                                backgroundColor: stat.color,
                                color: '#fff',
                                borderRadius: '8px',
                                textAlign: 'center',
                            }}
                            bodyStyle={{ padding: 20 }}
                        >
                            <div style={{ fontSize: 24 }}>{stat.icon}</div>
                            <div style={{ fontSize: 14 }}>{stat.title}</div>
                            <div style={{ fontSize: 32, fontWeight: 'bold' }}>
                                {stat.value.toString().padStart(2, '0')}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card title="Payments" style={{ marginTop: 40 }}>
                <PaymentsListContainer />
            </Card>
        </div>

    );
};

