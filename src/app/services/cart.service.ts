import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = new BehaviorSubject<CartItem[]>([]);

  getItems() {
    return this.items.asObservable();
  }

  addToCart(product: Product) {
    const currentItems = this.items.value;
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.items.next([...currentItems]);
    } else {
      this.items.next([...currentItems, { ...product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number) {
    const currentItems = this.items.value;
    this.items.next(currentItems.filter(item => item.id !== productId));
  }
}