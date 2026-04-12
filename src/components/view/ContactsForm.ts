import { Form } from "./Form";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { IContactsForm } from "../../types";

export class ContactsForm extends Form<IContactsForm> {
  protected _emailInput: HTMLInputElement;
  protected _phoneInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._emailInput = ensureElement<HTMLInputElement>(
      "input[name=email]",
      container,
    );
    this._phoneInput = ensureElement<HTMLInputElement>(
      "input[name=phone]",
      container,
    );
  }

  set email(value: string) {
    if (this._emailInput.value !== value) {
      this._emailInput.value = value;
    }
  }

  set phone(value: string) {
    if (this._phoneInput.value !== value) {
      this._phoneInput.value = value;
    }
  }
}
