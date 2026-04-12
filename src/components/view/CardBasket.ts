import { Card } from './Card';
import { ensureElement } from '../../utils/utils';
import { ICardBasket } from '../../types';

export class CardBasket extends Card<ICardBasket> {
  protected _index: HTMLElement;
  protected _deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, onClick: (event: MouseEvent) => void) {
    super(container);

    this._index = ensureElement<HTMLElement>('.basket__item-index', container);
    this._deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

    this._deleteButton.addEventListener('click', onClick);
  }
  
  set index(value: number) {
    this._index.textContent = String(value);
  }
}