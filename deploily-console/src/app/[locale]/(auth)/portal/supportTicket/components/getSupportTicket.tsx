import { Button, Col, Row, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useScopedI18n } from "../../../../../../../locales/client";
import { Plus } from "@phosphor-icons/react";
import { useAppDispatch } from "@/lib/hook";
import { useEffect } from "react";
import { fetchSupportTicket } from "@/lib/features/supportTicket/supportTicketThanks";
import { SupportTicket } from "@/lib/features/supportTicket/supportTicketInterface";
import { useSupportTicket } from "@/lib/features/supportTicket/supportTicketSelector";




export default function GetSupportTecket() {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('supportTicket')
    const translate = useScopedI18n('createSupportTicket')
    const { supportTicketList, isLoading, supportTicketLoadingError } = useSupportTicket()
    useEffect(() => {
        dispatch(fetchSupportTicket());
       
    }, []);

    // const keysToColumn = () => {
    //     let columns: GridColDef[] = [];
    //     ["source", "label", "target"].forEach((element) => {
    //       columns = [
    //         ...columns,
    //         {
    //           field: element,
    //           headerName: titleCase(element),
    //           sortable: false,
    //           minWidth: 150,
    //         },
    //       ];
    //     });
    //     return columns;
    //   };
    return (
        <>
            <Row gutter={16}>
                <Col span={14}>
                    <Title level={3} style={{ fontWeight: 700, color: '#ffff' }}>
                        {t("title")}
                    </Title>
                </Col>
                <Col span={10} style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                        style={{
                            color: "#ffff",
                            backgroundColor: "#5394CC",
                            padding: 10,
                            borderRadius: 25,
                            fontSize: 15,
                            height: 45
                        }}

                    >
                        <Plus size={20} style={{ color: "rgba(220, 233, 245, 0.88)" }} />
                        {translate("createTicket")}
                    </Button>
                </Col>

            </Row>
            
            {isLoading ?
                <span>loading</span> :
                
                <Table<SupportTicket>  dataSource={supportTicketList?.result} size="middle" />
            }
        </>
    )
}