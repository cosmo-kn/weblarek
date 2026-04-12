import { Card } from "./Card";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ICardCatalog } from "../../types";

export type TCategory = keyof typeof categoryMap;

export class CardCatalog<T extends ICardCatalog = ICardCatalog> extends Card<T> {  protected _category: HTMLElement;
  protected _image: HTMLImageElement;
  protected _id: string = "";

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this._category = ensureElement<HTMLElement>(".card__category", container);
    this._image = ensureElement<HTMLImageElement>(".card__image", container);

    this.container.addEventListener("click", () => {
      this.events.emit("card:select", { id: this._id });
    });
  }

  set id(value: string) {
    this._id = value;
  }

  set category(value: TCategory) {
    this._category.textContent = value;
    for (const key in categoryMap) {
      this._category.classList.toggle(
        categoryMap[key as TCategory],
        key === value,
      );
    }
  }

  set image(value: string) {
    this.setImage(this._image, CDN_URL + value);
  }
}
