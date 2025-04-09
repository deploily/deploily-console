"use client";
import * as React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Col, Drawer, Row, Select } from "antd";
import { Header } from "antd/es/layout/layout";
import LocaleSwitcher from "@/components/locale/localeSwitcher";
import { Coins, List } from "@phosphor-icons/react";
import { MainSideBarMobile } from "./sideBar";
import Link from "next/link";
import { useI18n } from "../../../../../../locales/client";
import { useProfileServices } from "@/lib/features/profileService/profileServiceSelectors";
import { theme } from "@/styles/theme";
import { fetchProfilesServices } from "@/lib/features/profileService/profileServiceThunks";
import { useAppDispatch } from "@/lib/hook";

export function AppAppBarDesktop() {
  const [theme] = useState("dark");
  const appBarColor = theme == "dark" ? "#2c82d4" : "#eda879";
  const t = useI18n();
  const { isLoading, profileServicesList } = useProfileServices();

  const { Option } = Select;
  const [profileSelected, setProfileSelected] = useState<number | undefined>(undefined);
  const [values, setValues] = useState<{ total_amount: number; profile_id: number }>({
    total_amount: 0,
    profile_id: 0,
  });
  const dispatch = useAppDispatch();
  
  useEffect(() => {
        dispatch(fetchProfilesServices());

  }, []);
  
  // Set the default selected profile when the profile list is loaded
  useEffect(() => {
    if (!isLoading && profileServicesList?.result?.length) {
      // Find the profile with name "Default"
      const defaultProfile = profileServicesList.result.find((profile) => profile.name === "Default");

      if (defaultProfile) {
        setProfileSelected(defaultProfile.id);
        setValues((prevValues) => ({ ...prevValues, profile_id: defaultProfile.id }));
      } else {
        // If "Default" profile is not found, select the first available profile
        const firstProfile = profileServicesList.result[0];
        setProfileSelected(firstProfile.id);
        setValues((prevValues) => ({ ...prevValues, profile_id: firstProfile.id }));
      }
    }
  }, [isLoading, profileServicesList]);

  // Handle profile selection change
  const handleSelectedProfile = (value: number) => {
    const selectedProfile = profileServicesList?.result?.find((profile) => profile.id === value);

    if (selectedProfile) {
      setValues((prevValues) => ({ ...prevValues, profile_id: selectedProfile.id }));
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
            <Link href="/portal">
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
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ color: "#D85912" }}>
                            {(() => {
                              const name = profileServicesList?.result?.find((p) => p.id === profileSelected)?.name;
                              return name ? name.charAt(0).toUpperCase() + name.slice(1) : "...";
                            })()}
                          </span>

                          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <span style={{ color: "#D85912" }}>
                              {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(
                                profileServicesList?.result?.find((p) => p.id === profileSelected)?.balance ?? 0
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
                      (profileServicesList?.result ?? []).map((profile) => (
                        <Option key={profile.id} value={profile.id}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}
                          >
                            <span style={{ color: "#D85912" }}>
                              {profile.name.charAt(0).toUpperCase() + profile.name.slice(1)}
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
                <Button
                  style={{
                    color: "#fff",
                    backgroundColor: "#D85912",
                    border: "none",
                  }}
                >
                  <Link href="/portal/home" data-testid="mocked-link">
                    <span
                      style={{
                        color: "rgba(220, 233, 245, 0.88)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      {t("ondemand")}
                    </span>
                  </Link>
                </Button>

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
