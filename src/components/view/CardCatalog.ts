import { Card } from "./Card";
import { ensureElement } from "../../utils/utils";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ICardCatalog } from "../../types";

export type TCategory = keyof typeof categoryMap;

export class CardCatalog<
  T extends ICardCatalog = ICardCatalog,
> extends Card<T> {
  protected _category: HTMLElement;
  protected _image: HTMLImageElement;

  constructor(container: HTMLElement, onClick: (event: MouseEvent) => void) {
    super(container);

    this._category = ensureElement<HTMLElement>(".card__category", container);
    this._image = ensureElement<HTMLImageElement>(".card__image", container);

    this.container.addEventListener("click", onClick);
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
    this.setImage(this._image, CDN_URL + value.replace("svg", "png"));
  }
}
