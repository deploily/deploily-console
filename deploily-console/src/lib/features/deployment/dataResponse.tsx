export const dataResponse = (data: any) => {
  return {
    status: 200,
    data: {
      id: "new-deployment-subscription-id",
      form_url:
        "https://test.satim.dz/payment/merchants/merchant1/payment_fr.html?mdOrder=evDfZPKidnk7XUAAG7T6",
      order_id: "order-id-12345",
      subscription: {
        id: 20,
        duration_month: data.duration_month,
        name: "Basic Plan",
        price: data.price,
        promo_code_id: data.promo_code_id,
        service_plan_id: data.service_plan_id,
        start_date: new Date(),
        status: "active",
      },
    },
  };
};
