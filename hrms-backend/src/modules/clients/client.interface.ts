export interface IClient extends Document {
    clientId:string;
    companyEmail:string;
    companyName:string;
    phone?:string;
    address?:string;
    subscriptionPlan:"FREE"|"PRO"|"ENTERPRISE";
    isActive:boolean;
    password:string;
    createdBy?:string;
    createdAt:Date;
    updateAt:Date;
}