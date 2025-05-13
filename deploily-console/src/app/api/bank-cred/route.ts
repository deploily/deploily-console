import { NextResponse } from 'next/server';

export async function GET() {
    console.log("Bank account information requested");
    console.log({
        "accountHolderName": process.env.BANK_ACCOUNT_HOLDER_NAME,
        "accountHolderAddress": process.env.BANK_ACCOUNT_HOLDER_ADDRESS,
        "bankName": process.env.BANK_ACCOUNT_BANK_NAME,
        "bankAgency": process.env.BANK_ACCOUNT_BANK_AGENCY,
        "accountNumber": process.env.BANK_ACCOUNT_NUMBER
    });
    
    
    if (process.env.BANK_ACCOUNT_HOLDER_NAME &&  process.env.BANK_ACCOUNT_HOLDER_ADDRESS &&  process.env.BANK_ACCOUNT_BANK_NAME &&  process.env.BANK_ACCOUNT_BANK_AGENCY &&  process.env.BANK_ACCOUNT_NUMBER) {
        return NextResponse.json({data:{
        "accountHolderName" :process.env.BANK_ACCOUNT_HOLDER_NAME,
        "accountHolderAddress": process.env.BANK_ACCOUNT_HOLDER_ADDRESS,
        "bankName": process.env.BANK_ACCOUNT_BANK_NAME,
        "bankAgency": process.env.BANK_ACCOUNT_BANK_AGENCY,
        "accountNumber": process.env.BANK_ACCOUNT_NUMBER
    }});}
    else{
        return NextResponse.json({"error": "Bank account information is not configured"});
    }
}
