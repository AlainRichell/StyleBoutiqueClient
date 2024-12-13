import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Summer Floral Dress',
      price: 59.99,
      description: 'Beautiful floral dress perfect for summer days',
      imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
      category: 'Women'
    },
    {
      id: 2,
      name: 'Classic Denim Jacket',
      price: 89.99,
      description: 'Timeless denim jacket for any casual outfit',
      imageUrl: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d',
      category: 'Men'
    },
    // Add more products here
  ];

  private filterSubject = new BehaviorSubject<string>('');
  private searchSubject = new BehaviorSubject<string>('');

  getProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }

  setFilter(category: string) {
    this.filterSubject.next(category);
  }

  setSearch(term: string) {
    this.searchSubject.next(term);
  }

  getFilter() {
    return this.filterSubject.asObservable();
  }

  getSearch() {
    return this.searchSubject.asObservable();
  }
}