import { Api } from "./components/base/Api";
import { Buyer } from "./components/models/Buyer";
import { Cart } from "./components/models/Cart";
import { Catalog } from "./components/models/Catalog";
import "./scss/styles.scss";
import { CommunicationApi } from "./components/communication/CommunicationApi";
import { API_URL } from "./utils/constants";
import { Modal } from "./components/view/Modal";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { EventEmitter } from "./components/base/Events";
import { CardCatalog } from "./components/view/CardCatalog";
import { CardPreview } from "./components/view/CardPreview";
import { CardBasket } from "./components/view/CardBasket";
import { Header } from "./components/view/Header";
import { Gallery } from "./components/view/Gallery";
import { Basket } from "./components/view/Basket";
import { OrderForm } from "./components/view/OrderForm";
import { ContactsForm } from "./components/view/ContactsForm";
import { OrderSuccess } from "./components/view/OrderSuccess";
import { IBuyer, TFormErrors } from "./types/index";

const events = new EventEmitter();
const api = new Api(API_URL);
const communicationApi = new CommunicationApi(api);

const catalog = new Catalog(events);

communicationApi
  .getProducts()
  .then((res) => catalog.setProducts(res.items))
  .catch((err) => console.error(err));

// Модели
const cart = new Cart(events);
const buyer = new Buyer(events);

// View
const header = new Header(ensureElement<HTMLElement>(".header"), events);
const gallery = new Gallery(ensureElement<HTMLElement>(".gallery"));
const modal = new Modal(ensureElement<HTMLElement>("#modal-container"), events);

//  View  компоненты для модалок
const basket = new Basket(cloneTemplate<HTMLElement>("#basket"), events);
const orderForm = new OrderForm(
  cloneTemplate<HTMLFormElement>("#order"),
  events,
);
const contactsForm = new ContactsForm(
  cloneTemplate<HTMLFormElement>("#contacts"),
  events,
);

// Изменение состояния каталога
events.on("catalog:changed", () => {
  const cards = catalog.getProducts().map((product) => {
    const card = new CardCatalog(
      cloneTemplate<HTMLElement>("#card-catalog"),
      events,
    );
    return card.render({
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image,
    });
  });
  gallery.render({ catalog: cards });
});

// Клик на карточку каталога
events.on("card:select", ({ id }: { id: string }) => {
  const product = catalog.getProductById(id);
  if (product) {
    catalog.setSelectedProduct(product);
  }
});

events.on("preview:changed", () => {
  const product = catalog.getSelectedProduct();
  if (!product) return;

  const cardPreview = new CardPreview(
    cloneTemplate<HTMLElement>("#card-preview"),
    events,
  );

  const inCart = cart.hasProduct(product.id);
  const buttonText =
    product.price === null
      ? "Недоступно"
      : inCart
        ? "Удалить из корзины"
        : "Купить";

  modal.render({
    content: cardPreview.render({
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description,
      buttonText,
      buttonDisabled: product.price === null,
    }),
  });
});

events.on("card:toggleCart", ({ id }: { id: string }) => {
  const product = catalog.getProductById(id);
  if (!product) return;

  if (cart.hasProduct(id)) {
    cart.removeProduct(id);
  } else {
    cart.addProduct(product);
  }

  modal.close();
});

events.on("card:remove", ({ id }: { id: string }) => {
  cart.removeProduct(id);
});

// подготовка View корзины
function renderBasket(): HTMLElement {
  const items = cart.getProducts().map((product, index) => {
    const card = new CardBasket(
      cloneTemplate<HTMLElement>("#card-basket"),
      events,
    );
    return card.render({
      id: product.id,
      title: product.title,
      price: product.price,
      index: index + 1,
    });
  });

  return basket.render({
    items,
    total: cart.getTotalPrice(),
  });
}

// Перерендер корзины при изменении
events.on("cart:changed", () => {
  header.render({ counter: cart.getCount() });
  renderBasket();
});

// Открытие корзины
events.on("basket:open", () => {
  modal.render({ content: renderBasket() });
});

// Кнопка "Оформить" в корзине
events.on("order:open", () => {
  modal.render({
    content: orderForm.render({
      payment: "",
      address: "",
      valid: false,
      errors: "",
    }),
  });
});

// Изменение полей в форме заказа (оплата, адрес)
events.on(
  "order:input",
  ({ field, value }: { field: keyof IBuyer; value: string }) => {
    buyer.setData({ [field]: value });
  },
);

// Изменение полей в форме контактов (почта, телефон)
events.on(
  "contacts:input",
  ({ field, value }: { field: keyof IBuyer; value: string }) => {
    buyer.setData({ [field]: value });
  },
);

// Изменение данных покупателя
events.on("buyer:changed", () => {
  const data = buyer.getData();
  const errors = buyer.validate() as TFormErrors;

  const orderErrors = [errors.payment, errors.address]
    .filter(Boolean)
    .join(". ");
  orderForm.render({
    payment: data.payment,
    valid: !orderErrors,
    errors: orderErrors,
  });

  const contactsErrors = [errors.email, errors.phone]
    .filter(Boolean)
    .join(". ");
  contactsForm.render({
    valid: !contactsErrors,
    errors: contactsErrors,
  });
});

// Кнопка "Далее" в форме заказа
events.on("order:submit", () => {
  modal.render({
    content: contactsForm.render({
      email: "",
      phone: "",
      valid: false,
      errors: "",
    }),
  });
});

// Кнопка "Оплатить" в форме контактов
events.on("contacts:submit", () => {
  const order = {
    ...buyer.getData(),
    items: cart.getProducts().map((p) => p.id),
    total: cart.getTotalPrice(),
  };

  communicationApi
    .sendOrder(order)
    .then((response) => {
      cart.clear();
      buyer.clear();

      const success = new OrderSuccess(
        cloneTemplate<HTMLElement>("#success"),
        events,
      );
      modal.render({
        content: success.render({ total: response.total }),
      });
    })
    .catch((err) => {
      console.error("Ошибка отправки заказа:", err);
    });
});

// Закрытие экрана подтверждения заказа
events.on("success:close", () => {
  modal.close();
});

// Сброс выбранного товара при закрытии модалки
events.on("modal:close", () => {
  catalog.setSelectedProduct(null);
});
