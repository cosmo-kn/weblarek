import { Form } from "./Form";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { IOrderForm } from "../../types";
import { TPayment } from "../../types";

export class OrderForm extends Form<IOrderForm> {
  protected _cardButton: HTMLButtonElement;
  protected _cashButton: HTMLButtonElement;
  protected _addressInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._cardButton = ensureElement<HTMLButtonElement>(
      "button[name=card]",
      container,
    );
    this._cashButton = ensureElement<HTMLButtonElement>(
      "button[name=cash]",
      container,
    );
    this._addressInput = ensureElement<HTMLInputElement>(
      "input[name=address]",
      container,
    );

    this._cardButton.addEventListener("click", () => {
      this.events.emit("order:input", { field: "payment", value: "online" });
    });

    this._cashButton.addEventListener("click", () => {
      this.events.emit("order:input", { field: "payment", value: "offline" });
    });
  }

  set payment(value: TPayment) {
    this._cardButton.classList.toggle("button_alt-active", value === "online");
    this._cashButton.classList.toggle("button_alt-active", value === "offline");
  }

    set address(value: string) {
    if (this._addressInput.value !== value) {
      this._addressInput.value = value;
    }
  }
}
