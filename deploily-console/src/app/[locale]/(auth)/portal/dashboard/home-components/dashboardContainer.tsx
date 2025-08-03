"use client";
import { useApiServiceSubscription } from '@/lib/features/api-service-subscriptions/apiServiceSubscriptionSelectors';
import { fetchApiServiceSubscription } from '@/lib/features/api-service-subscriptions/apiServiceSubscriptionThunks';
import { useCloudResource } from '@/lib/features/cloud-resource/cloudResourceSelectors';
import { getMyResources } from '@/lib/features/cloud-resource/cloudResourceThunks';
import { useFavoriteServices } from '@/lib/features/favorites/favoriteServiceSelectors';
import { fetchMyFavoriteServices } from '@/lib/features/favorites/favoriteServiceThunks';
import { useMyApplicationList } from '@/lib/features/my-applications/myApplicationSelector';
import { fetchMyApplications } from '@/lib/features/my-applications/myApplicationThunks';
import { useProfile } from '@/lib/features/profile/profileSelectors';
import { getProfile } from '@/lib/features/profile/profileThunks';
import { useSupportTicket } from '@/lib/features/support-ticket/supportTicketSelector';
import { fetchSupportTicket } from '@/lib/features/support-ticket/supportTicketThunks';
import { useAppDispatch } from '@/lib/hook';
import { Handshake, Heart, Invoice, Question, SquaresFour } from '@phosphor-icons/react/dist/ssr';
import { Card, Col, Row, Typography } from 'antd';
import { useEffect } from 'react';
import { useI18n, useScopedI18n } from '../../../../../../../locales/client';
import PaymentsListContainer from './payments_components';
import Link from 'next/link';


export default function DashboardContainer() {
    const dashboardtranslate = useScopedI18n("dashboard");
    const t = useI18n();

    const { Title, Text } = Typography;
    const dispatch = useAppDispatch();


    const { currentProfile } = useProfile();
    const { myResourcesResponse } = useCloudResource();
    const { supportTicketList } = useSupportTicket()
    const { favoriteServicesList } = useFavoriteServices();
    const { apiServiceSubscriptionResponse } = useApiServiceSubscription();
    const { MyApplicationList } = useMyApplicationList()

    useEffect(() => {
        dispatch(fetchApiServiceSubscription("active"));
        dispatch(getProfile());
        dispatch(getMyResources());
        dispatch(fetchSupportTicket());
        dispatch(fetchMyFavoriteServices());
        dispatch(fetchMyApplications());
    }, [dispatch]);


    const apiServicesCount = apiServiceSubscriptionResponse?.length || 0;
    const applicationsCount = MyApplicationList?.length || 0;
    const favoritesCount = favoriteServicesList?.count || 0;
    const supportTicketsCount = supportTicketList?.count || 0;
    const affiliationCount = myResourcesResponse?.length || 0;


    const stats = [
        {
            key: "apiServices",
            title: dashboardtranslate("apiServices"),
            value: apiServicesCount,
            icon: <Invoice style={{ fontSize: 30, color: '#fff' }} />,
            color: '#FFB84D',
            linkToServicesList: "/portal/api-services",
            linkToMyServices: "/portal/my-api"
        },
        {
            key: "affiliations",
            title: dashboardtranslate("affiliations"),
            value: affiliationCount,
            icon: <Handshake style={{ fontSize: 30, color: '#fff' }} />,
            color: '#5394CC',
            linkToServicesList: "/portal/cloud-resources",
            linkToMyServices: "/portal/my-resources"
        },
        {
            key: "applications",
            title: dashboardtranslate("applications"),
            value: applicationsCount,
            icon: <SquaresFour style={{ fontSize: 30, color: '#fff' }} />,
            color: '#FF9933',
            linkToServicesList: "/portal/application",
            linkToMyServices: "/portal/my-applications"
        },

        {
            key: "supportTickets",
            title: dashboardtranslate("supportTickets"),
            value: supportTicketsCount,
            icon: <Question style={{ fontSize: 30, color: '#fff' }} />,
            color: '#0099CC',
        },
        {
            key: "favorites",
            title: dashboardtranslate("favorites"),
            value: favoritesCount,
            icon: <Heart style={{ fontSize: 30, color: '#fff' }} />,
            color: '#DD8859',
        },

    ];

    return (
        <div style={{ padding: '24px', minHeight: '100vh' }}>
            {currentProfile && (<Title level={3} style={{ color: '#fff' }}>
                {dashboardtranslate("welcome")}
                {currentProfile.first_name}!
            </Title>)
            }
            <Text style={{ color: '#ccc' }}>
                {dashboardtranslate("subTitle")}
            </Text>

            <Row gutter={[16, 16]} style={{ marginTop: 24 }} wrap>
                {stats.map((stat) => (
                    <Col flex="20%" key={stat.key}>
                        <Card
                            style={{
                                height: 170,
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
                            {stat.linkToServicesList &&
                            <>{stat.value === 0 ? <Link href={stat.linkToServicesList} style={{ color: '#fff', textDecoration: 'underline' }}>
                                        {t("explore") + " " + stat.title}
                            </Link> 
                            : 
                            <Link href={stat.linkToMyServices} style={{ color: '#fff', textDecoration: 'underline' }}>
                                {t("explore") + " " + stat.title}
                            </Link>}
                            </> 
                            }
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card title={dashboardtranslate("payments")}
                style={{ marginTop: 40 }}>
                <PaymentsListContainer />
            </Card>
        </div>

    );
};

