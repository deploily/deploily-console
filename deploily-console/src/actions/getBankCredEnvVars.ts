"use server";

export const getBankCredEnvVars = async () => {
  if (
    process.env.BANK_ACCOUNT_HOLDER_NAME &&
    process.env.BANK_ACCOUNT_HOLDER_ADDRESS &&
    process.env.BANK_ACCOUNT_BANK_NAME &&
    process.env.BANK_ACCOUNT_BANK_AGENCY &&
    process.env.BANK_ACCOUNT_NUMBER
  ) {
    return {
      accountHolderName: process.env.BANK_ACCOUNT_HOLDER_NAME,
      accountHolderAddress: process.env.BANK_ACCOUNT_HOLDER_ADDRESS,
      bankName: process.env.BANK_ACCOUNT_BANK_NAME,
      bankAgency: process.env.BANK_ACCOUNT_BANK_AGENCY,
      accountNumber: process.env.BANK_ACCOUNT_NUMBER,
    };
  } else {
    return undefined;
  }
};
