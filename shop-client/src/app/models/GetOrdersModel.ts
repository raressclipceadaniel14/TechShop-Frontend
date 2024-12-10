import { ProductModel } from "./ProductModel";

export class GetOrdersModel {
    id: number;
    address: string;
    placementDate: Date;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    orderStatus: string;
    paymentMethod: string;
    products?: ProductModel[];
  }