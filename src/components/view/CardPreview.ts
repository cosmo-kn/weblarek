import { CardCatalog } from './CardCatalog';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { ICardPreview } from '../../types';

export class CardPreview extends CardCatalog<ICardPreview> {
  protected _description: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this._description = ensureElement<HTMLElement>('.card__text', container);
    this._button = ensureElement<HTMLButtonElement>('.card__button', container);

    this._button.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
      this.events.emit('card:toggleCart', { id: this._id });
    });
  }

  set description(value: string) {
    this._description.textContent = value;
  }

  set buttonText(value: string) {
    this._button.textContent = value;
  }

  set buttonDisabled(value: boolean) {
    this._button.disabled = value;
  }
}