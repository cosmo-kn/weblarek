import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Catalog {
  private products: IProduct[];
  private selectedProduct: IProduct | null = null;
  
  constructor(protected events: IEvents, products: IProduct[] = []) {
    this.products = products
  }

  setProducts(products: IProduct[]): void {
      this.products = products
      this.events.emit('catalog:changed')
    }

  getProducts(): IProduct[] {
      return this.products
    }

  getProductById(id: string): IProduct | undefined {
      return this.products.find(product => product.id === id)
    }

  setSelectedProduct(product: IProduct | null): void {
    this.selectedProduct = product
    this.events.emit('preview:changed');

  }
  
  getSelectedProduct(): IProduct | null {
    return this.selectedProduct
  }
}