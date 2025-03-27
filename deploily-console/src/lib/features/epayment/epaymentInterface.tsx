export interface EpaymentStatusResult {    
status: string;
details: EpaymentDetails;
}

export interface EpaymentDetails {    
    ERRORCODE:number;
    ORDERNUMBER:number;
    AMOUNT:number;
    ACTIONCODEDESCRIPTION:string;
}