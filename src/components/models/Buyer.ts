import { IBuyer, TFormErrors, TPayment } from "../../types";
import { IEvents } from "../base/Events";


export class Buyer {
  private payment: TPayment = '';
  private address: string = '';
  private email: string = '';
  private phone: string = '';

  constructor(protected events: IEvents, data: Partial<IBuyer> = {}) {
    this.setData(data)
  }  

  setData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.address !== undefined) this.address = data.address;
    if (data.email !== undefined) this.email = data.email;
    if (data.phone !== undefined) this.phone = data.phone;
    this.events.emit('buyer:changed');
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone
    }
  }

  clear(): void {
    this.payment = '';
    this.address = '';
    this.email = '';
    this.phone = '';
    this.events.emit('buyer:changed');
  }

  validate(): TFormErrors | {} {
    const errors: TFormErrors = {};
    if(!this.payment) errors.payment = 'Выберите способ оплаты';
    if(!this.address) errors.address = 'Введите адрес';
    if(!this.email) errors.email = 'Введите Email';
    if(!this.phone) errors.phone = 'Введите телефон';
    return errors
  }
}

