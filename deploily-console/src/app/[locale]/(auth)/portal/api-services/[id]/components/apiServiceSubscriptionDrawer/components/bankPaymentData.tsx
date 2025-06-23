const bankPaymentInfo = (t: any, bankTransfertInformation:any)=>[
    {
     "title":t("name"),
        "value": bankTransfertInformation.accountHolderName
    },   
     {
     "title":t("address"),
         "value": bankTransfertInformation.accountHolderAddress
    },
    {
     "title":t("bank"),
     "value": bankTransfertInformation.bankName
    },  
    {
     "title":t("agency"),
     "value": bankTransfertInformation.bankAgency
    },
    {
     "title":t("rib"),
    "value": bankTransfertInformation.accountNumber
    },


]

export default bankPaymentInfo