import { Card } from './Card';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { ICardBasket } from '../../types';

export class CardBasket extends Card<ICardBasket> {
  protected _index: HTMLElement;
  protected _deleteButton: HTMLButtonElement;
  protected _id: string = '';

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._index = ensureElement<HTMLElement>('.basket__item-index', container);
    this._deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

    this._deleteButton.addEventListener('click', () => {
      this.events.emit('card:remove', { id: this._id });
    });
  }

  set id(value: string) {
    this._id = value;
  }

  set index(value: number) {
    this._index.textContent = String(value);
  }
}