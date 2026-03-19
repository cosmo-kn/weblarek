import { Api } from './components/base/Api';
import { Buyer } from './components/models/Buyer';
import { Cart } from './components/models/Cart';
import { Catalog } from './components/models/Catalog';
import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { CommunicationApi } from './components/communication/CommunicationApi';
import { API_URL } from './utils/constants';

//Класс продавец и тестирование его методов
const buyer = new Buyer(
  {
    payment: "online", 
    address: "Kazan", 
    email: "123@mail.ru", 
    phone: "79991231231"
  }
)

console.log(buyer.getData())
buyer.setData({address: "Moscow"})
console.log(buyer.getData())
console.log(buyer.validate())
buyer.setData({address: ""})
console.log(buyer.validate())
buyer.clear()
console.log(buyer.getData())


//Класс корзина и тестирование его методов
const cart = new Cart(apiProducts.items)

console.log(cart.getProducts())
console.log(cart.getCount())
console.log(cart.getTotalPrice())
console.log(cart.hasProduct("854cef69-976d-4c2a-a18c-2aa45046c390"))
cart.removeProduct("854cef69-976d-4c2a-a18c-2aa45046c390")
console.log(cart.hasProduct("854cef69-976d-4c2a-a18c-2aa45046c390"))
cart.clear()
console.log(cart.getProducts())


//Класс каталог и тестирование его методов
const catalog = new Catalog(apiProducts.items)

console.log(catalog.getProducts())
console.log(catalog.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390"))
catalog.setSelectedProduct(apiProducts.items[0])
console.log(catalog.getSelectedProduct())


//Запрос к серверу за объектом с данными каталога.
//Сохранение массива в модели данных и вывод массива в консоль
const api = new Api(API_URL)
const communicationApi = new CommunicationApi(api)

communicationApi.getProducts().then(res => {
  catalog.setProducts(res.items)
  console.log(catalog.getProducts())
}).catch(e => console.log(e.statusText))


// communicationApi.sendOrder({
//     "payment": "online",
//     "email": "test@test.ru",
//     "phone": "+71234567890",
//     "address": "Spb Vosstania 1",
//     "total": 2200,
//     "items": [
//         "854cef69-976d-4c2a-a18c-2aa45046c390",
//         "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
//     ]
// }).then(response => console.log(response))

