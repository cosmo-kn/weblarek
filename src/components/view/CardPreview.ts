import { CardCatalog } from "./CardCatalog";
import { ensureElement } from "../../utils/utils";
import { ICardPreview } from "../../types";

export class CardPreview extends CardCatalog<ICardPreview> {
  protected _description: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, onClick: (event: MouseEvent) => void) {
    super(container, () => {});

    this._description = ensureElement<HTMLElement>(".card__text", container);
    this._button = ensureElement<HTMLButtonElement>(".card__button", container);

    this._button.addEventListener("click", onClick);
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
