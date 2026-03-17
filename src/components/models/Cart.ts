import { IProduct } from "../../types";

export class Cart {

  constructor(private products: IProduct[] = []) {}

  getProducts(): IProduct[]{
    return this.products
  }

  addProduct(product: IProduct) {
    if (this.hasProduct(product.id)) return
    this.products.push(product)
  }

  removeProduct(id: string): void {
    this.products = this.products.filter(product => product.id !== id)
  }

  clear(): void {
    this.products = []
  }

  getTotalPrice(): number {
    return this.products.reduce((acc, product) => acc + (product.price ?? 0), 0) 
  }

  getCount(): number {
    return this.products.length
  }
  
  hasProduct(id: string): boolean {
    return this.products.some(product => product.id === id)
  }
}