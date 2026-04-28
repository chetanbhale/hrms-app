export interface Client {
  _id: string;
  companyName: string;
  companyEmail: string;
  subscriptionPlan: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}