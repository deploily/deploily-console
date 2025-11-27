export const data = {
  status: 200,
  data: {
    result: [
      {
        id: 1,
        name: "Docker",
        price: 1000,
        price_category: "monthly",
        short_description:
          "Docker is an open-source platform that enables developers to build, deploy, run, update and manage containers.",
        image: "/images/docker.png",
        status: "active",
        deployment_status: "deployed",
        start_date: "2025-10-01",
        duration_month: 12,
        access_url: "https://example-docker-access-url.com",
        service_details: {
          api_key: null,
          api_playground_url: null,
          curl_command: null,
          description:
            "Docker is an open-source platform that allows developers to easily build, deploy, run, update, and manage applications inside containers. It provides a lightweight, portable, and consistent environment that simplifies software development and deployment across different systems and infrastructures.",
          documentation_url: "",
          id: 34,
          image_service: "",
          is_subscribed: false,
          monitoring: null,
          name: "Docker",
          price_period: null,
          service_slug: "docker",
          service_url: null,
          short_description:
            "Docker is an open-source platform that enables developers to build, deploy, run, update and manage containers.",
          specifications: "",
          ssh_access: null,
          type: "deployment",
          unit_price: 1000,
        },
        parameters: [
          {
            id: 1,
            key: "DB_HOST",
            value: "localhost",
          },
          {
            id: 2,
            key: "DB_PORT",
            value: "5432",
          },
        ],
      },
    ],
  },
};
