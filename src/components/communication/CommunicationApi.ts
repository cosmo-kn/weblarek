import {IApi, TOrderRequest, TOrderResponse } from "../../types";
import { TProductsResponse } from "../../types";

export class CommunicationApi {
  constructor(private api: IApi) {
  }

  getProducts(): Promise<TProductsResponse> {
    return this.api.get<TProductsResponse>('/product/')
  }

  sendOrder(order: TOrderRequest): Promise<TOrderResponse> {
    return this.api.post<TOrderResponse>('/order/', order)
  }
}
