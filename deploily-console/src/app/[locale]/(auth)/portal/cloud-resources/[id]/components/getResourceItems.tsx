"use client";

import { ResourceInterface } from "@/lib/features/cloud-resource/cloudResourceInterface";
import { theme } from "@/styles/theme";
import { Col, CollapseProps, Row, Typography } from "antd";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export const getResourceItems = (
  currentResource: ResourceInterface,
  t: any
): CollapseProps["items"] => [
    {
      key: "1",
      label: (
        <Typography.Title
          level={3}
          style={{
            fontWeight: 700,
            fontSize: 24,
            color: theme.token.orange600,
          }}
        >
          {t("whoIs")} {currentResource.provider?.name}
        </Typography.Title>
      ),
      children: (
        <Typography.Paragraph style={{ fontWeight: 600, fontSize: 14 }}>
          {currentResource.provider?.short_description}
        </Typography.Paragraph>
      ),
    },
    {
      key: "2",
      label: (
        <Typography.Title
          level={3}
          style={{
            fontWeight: 700,
            fontSize: 24,
            color: theme.token.orange600,
          }}
        >
          {t("contactProvider")}
        </Typography.Title>
      ),
      children: (
        <div style={{ fontWeight: 600, fontSize: 14 }}>
          <ReactMarkdown>
            {`
### ${currentResource.provider?.name}



**${t('supportEmail')}:** ${currentResource.provider?.mail_support ? `[${currentResource.provider.mail_support}](mailto:${currentResource.provider.mail_support})` : "_N/A_"}

**${t('salesEmail')}:** ${currentResource.provider?.mail_sales ? `[${currentResource.provider.mail_support}](mailto:${currentResource.provider.mail_sales})` : "_N/A_"}
   
**${t('supportPhone')}:** ${currentResource.provider?.phone_support || "_N/A_"}  

**${t('salesPhone')}:** ${currentResource.provider?.phone_sales || "_N/A_"}  

        `}
          </ReactMarkdown>

          <Row>
            {socialMedias(currentResource).map((socialM, index) => (
              socialM !== null && <a
                key={index}
                href={socialM.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  margin: "2px",
                  paddingBottom: "0px",
                  paddingTop: "10px",
                  color: "white",
                }}
              >
                <Col
                  style={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "center",
                    margin: "0 5px",
                  }}
                >
                  <Image
                    src={socialM.image}
                    width={30}
                    height={30}
                    alt={socialM.alt}
                  />
                </Col>
              </a>
            ))}
          </Row>
        </div>
      ),
    },
  ];

export const socialMedias = (currentResource: ResourceInterface) => [
  (currentResource.provider?.facebook_page) ? {
    link: currentResource.provider?.facebook_page,
    image: "/images/facebook.png",
    alt: "Facebook",
  } : null,
  (currentResource.provider?.linkedin_page) ? {
    link: currentResource.provider?.linkedin_page,
    image: "/images/linkedin.png",
    alt: "LinkedIn",
  } : null,
  (currentResource.provider?.instagram_page) ? {
    link: currentResource.provider?.instagram_page,
    image: "/images/instagram_logo.png",
    alt: "GitHub",
  } : null,
  (currentResource.provider?.website) ? {
    link: currentResource.provider?.website,
    image: "/images/www.png",
    alt: "website",
  } : null,
];
