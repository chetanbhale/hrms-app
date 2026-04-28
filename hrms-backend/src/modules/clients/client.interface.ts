export interface IClient extends Document {
    companyEmail:string;
    companyName:string;
    phone?:string;
    address?:string;
    subscriptionPlan:"FREE"|"PRO"|"ENTERPRISE";
    isActive:boolean;
    createdBy:string;
    createdAt:Date;
    updateAt:Date;
}