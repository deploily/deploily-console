import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { NotificationInstance } from 'antd/es/notification/interface';

export const openNotification = (
    api: NotificationInstance,
    status: boolean,
    toastTranslate: (key: any, ...args: any[]) => string | React.ReactNode
) => {


    api.open({

        message: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {status ? (
                    <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 20 }} />
                ) : (
                    <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: 20 }} />
                )}
                <span style={{ color: '#000', fontWeight: 600 }}>
                    {status ? toastTranslate("msgSuccess") : toastTranslate("msgFailed")}
                </span>
            </div>
        ),
        description: (
            <div style={{ color: '#888' }}>
                {status ? toastTranslate("titleMsgSuccess") : toastTranslate("titleMsgFailed")}
            </div>
        ),
        duration: 4,
        style: {
            backgroundColor: '#fff',
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
    });

};
