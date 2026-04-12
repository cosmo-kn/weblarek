export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export type TPayment = "online" | "offline" | "";

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export type TFormErrors = Partial<Record<keyof IBuyer, string>>;

export type TProductsResponse = {
  total: number;
  items: IProduct[];
};

export type TProductResponse = IProduct;

export type TOrderRequest = IBuyer & {
  total: number;
  items: string[];
};

export type TOrderResponse = {
  id: string;
  total: number;
};

export interface ICard extends Pick<IProduct, "title" | "price"> {}

export interface ICardCatalog extends ICard {
  category: string;
  image: string;
}

export interface ICardPreview extends ICardCatalog {
  description: string;
  buttonText: string;
  buttonDisabled: boolean;
}

export interface ICardBasket extends ICard {
  index: number;
}

export interface IBasket {
  items: HTMLElement[];
  total: number;
}

export interface IForm {
  valid: boolean;
  errors: string;
}

export interface IOrderForm extends IForm {
  payment: TPayment;
  address: string;
}

export interface IContactsForm extends IForm {
  email: string;
  phone: string;
}

export interface IOrderSuccess {
  total: number;
}

// export type ErrorResponse = {
//     error: string
// }
