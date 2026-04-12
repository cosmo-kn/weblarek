import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { IForm } from '../../types';

export class Form<T extends IForm = IForm> extends Component<T> {
  protected _submitButton: HTMLButtonElement;
  protected _errorsContainer: HTMLElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this._submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', container);
    this._errorsContainer = ensureElement<HTMLElement>('.form__errors', container);

    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.events.emit(`${this.container.name}:submit`);
    });

    this.container.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.events.emit(`${this.container.name}:input`, {
        field: target.name,
        value: target.value,
      });
    });
  }

  set valid(value: boolean) {
    this._submitButton.disabled = !value;
  }

  set errors(value: string) {
    this._errorsContainer.textContent = value;
  }
}