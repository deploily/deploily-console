"use client";
import LocaleSwitcher from "@/components/locale/localeSwitcher";
import { usePaymentProfiles } from "@/lib/features/payment-profiles/paymentProfilesSelectors";
import { fetchPaymentProfiles } from "@/lib/features/payment-profiles/paymentProfilesThunks";
import { useAppDispatch } from "@/lib/hook";
import { Coins, List } from "@phosphor-icons/react";
import { Col, Drawer, Row, Select } from "antd";
import { Header } from "antd/es/layout/layout";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FeedbackAlert from "../feed-back/feedBackAlert";
import { MainSideBarMobile } from "./sideBar";

export function AppAppBarDesktop() {
  const [theme] = useState("dark");
  const appBarColor = theme == "dark" ? "#2c82d4" : "#eda879";
  const { isLoading, paymentProfilesList } = usePaymentProfiles();

  const { Option } = Select;
  const [profileSelected, setProfileSelected] = useState<number | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPaymentProfiles());

  }, []);

  // Set the default selected profile when the profile list is loaded
  useEffect(() => {
    if (!isLoading && paymentProfilesList?.result?.length) {
      // Find the profile with type "default"
      const defaultProfile = paymentProfilesList.result.find((profile) => profile.profile_type === "default");

      if (defaultProfile) {
        setProfileSelected(defaultProfile.id);
      } else {
        // If "default" profile is not found, select the first available profile
        const firstProfile = paymentProfilesList.result[0];
        setProfileSelected(firstProfile.id);
      }
    }
  }, [isLoading, paymentProfilesList]);

  // Handle profile selection change
  const handleSelectedProfile = (value: number) => {
    const selectedProfile = paymentProfilesList?.result?.find((profile) => profile.id === value);

    if (selectedProfile) {
      setProfileSelected(selectedProfile.id);
    }
  };


  return (
    <>
      <Header
        style={{
          backgroundColor: theme === "dark" ? "rgba(12, 13, 15, 0.9)" : "#FFFFFF",
          backgroundImage: "none",
          display: "flex",
          justifyContent: "center",
          lineHeight: "0px",
          height: "70px",
          boxShadow:
            theme === "dark"
              ? "0 4px 8px rgba(0, 0, 0, 0.25)"
              : "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row align="middle" justify="space-between" style={{ width: "100%" }}>
          <Col style={{ flexGrow: 1 }}>
            <Link href="/portal/home">
              <Image
                src="/images/logo_name.png"
                width={202}
                height={50}
                alt="logo-deploily"
                style={{ marginRight: "20px", cursor: "pointer" }}
              />
            </Link>
          </Col>

          <Row style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
            <Col>
              <Row style={{ display: "flex", gap: 16, alignItems: "center" }}>
                {/* Profile Select */}
                <div>
                  <Select
                    labelInValue
                    value={{
                      key: profileSelected?.toString() || "",
                      label: (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%", // ensure it stretches correctly in parent
                          }}
                        >
                          <span
                            style={{
                              color: "#D85912",
                              maxWidth: "60%",            // Prevents it from growing too wide
                              overflow: "hidden",         // Hides the overflow
                              textOverflow: "ellipsis",   // Adds the "..."
                              whiteSpace: "nowrap",       // Prevents wrapping
                              display: "inline-block",    // Required for ellipsis to work
                            }}
                          >
                            {(() => {
                              const name = paymentProfilesList?.result?.find((p) => p.id === profileSelected)?.name;
                              return name ? name.charAt(0).toUpperCase() + name.slice(1) : "...";
                            })()}
                          </span>

                          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <span style={{ color: "#D85912" }}>
                              {Intl.NumberFormat("fr-FR", { useGrouping: true }).format(
                                paymentProfilesList?.result?.find((p) => p.id === profileSelected)?.balance ?? 0
                              )}
                            </span>
                            <span style={{ color: "#D85912" }}>DZD</span>
                            <Coins size={18} color={"#D85912"} />
                          </div>
                        </div>
                      ),
                    }}
                    style={{
                      width: 200,
                      border: "1px solid #D85912 !important",
                      backgroundColor: "#202227",
                      borderRadius: "6px",
                      marginBottom: "0px",
                    }}
                    onChange={(value) => handleSelectedProfile(Number(value.key))}
                    dropdownRender={(menu) => (
                      <>
                        <style>
                          {`
                            .ant-select-item-option-selected {
                              border: 1px solid #D85912 !important;
                              border-radius: 4px;
                            }
                          `}
                        </style>
                        {menu}
                      </>
                    )}
                  >
                    {!isLoading &&
                      (paymentProfilesList?.result ?? []).map((profile) => (
                        <Option key={profile.id} value={profile.id}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%", 
                            }}
                          >
                            <span
                              style={{
                                color: "#D85912",
                                maxWidth: "60%",            // Prevents it from growing too wide
                                overflow: "hidden",         // Hides the overflow
                                textOverflow: "ellipsis",  
                                whiteSpace: "nowrap",      
                                display: "inline-block",    
                              }}
                            >
                              {(() => {
                                const name= profile.name.charAt(0).toUpperCase() + profile.name.slice(1)

                                return name ? name.charAt(0).toUpperCase() + name.slice(1) : "...";
                              })()}
                            </span>

                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                              <span style={{ color: "#D85912" }}>
                                {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(profile.balance)}
                              </span>
                              <span style={{ color: "#D85912" }}>DZD</span>
                              <Coins size={18} color={"#D85912"} />
                            </div>
                          </div>
                        </Option>
                      ))}
                  </Select>

                </div>

                {/* Navigation Button */}
                <FeedbackAlert />
                {/* Language Switcher */}
                <LocaleSwitcher color={appBarColor} />
              </Row>
            </Col>
          </Row>
        </Row>
      </Header>
    </>
  );
}

export function AppAppBarMobile() {
  const [theme] = useState("dark");
  const appBarColor = theme == "dark" ? "#2c82d4" : "#eda879";

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header
        style={{
          backgroundColor: theme === "dark" ? "rgba(12, 13, 15, 0.9)" : "#FFFFFF",
          backgroundImage: "none",
          display: "flex",
          justifyContent: "center",
          lineHeight: "0px",
          height: "70px",
          padding: "0px",
          boxShadow:
            theme === "dark" ? "0 4px 8px rgba(0, 0, 0, 0.25)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row align="middle" justify="space-between" style={{ width: "100%" }}>
          <Col style={{ flexGrow: 1 }}>
            <Link href="/portal">
              <Image
                src="/images/logo_name.png"
                width={202}
                height={50}
                alt="logo-deploily"
                style={{
                  marginRight: "20px",
                }}
              />
            </Link>
          </Col>
          <Row
            style={{
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Col>
              <Row
                style={{
                  display: "flex",
                  gap: 8,
                  padding: "10px",
                  alignItems: "center",
                }}
              >
                <LocaleSwitcher color={appBarColor} />
                <List size={28} style={{ color: "#D85912" }} onClick={showDrawer} />
              </Row>
            </Col>
          </Row>
        </Row>
        <Drawer onClose={onClose} open={open} width={"50%"} styles={{ body: { padding: "0px" } }}>
          <MainSideBarMobile />
        </Drawer>
      </Header>
    </>
  );
}
