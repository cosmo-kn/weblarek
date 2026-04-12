import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { IBasket } from '../../types';

export class Basket extends Component<IBasket> {
  protected _list: HTMLElement;
  protected _totalPrice: HTMLElement;
  protected _orderButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._list = ensureElement<HTMLElement>('.basket__list', container);
    this._totalPrice = ensureElement<HTMLElement>('.basket__price', container);
    this._orderButton = ensureElement<HTMLButtonElement>('.basket__button', container);

    this._orderButton.addEventListener('click', () => {
      this.events.emit('order:open');
    });
  }

  set items(value: HTMLElement[]) {
    if (value.length) {
      this._list.replaceChildren(...value);
      this._orderButton.disabled = false;
    } else {
      this._list.replaceChildren();
      this._orderButton.disabled = true;
    }
  }

  set total(value: number) {
    this._totalPrice.textContent = `${value} синапсов`;
  }
}