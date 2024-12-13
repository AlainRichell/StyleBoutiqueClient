import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { Marca } from '../models/product.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products$ = new BehaviorSubject<Product[]>([]);
  private categoryFilter$ = new BehaviorSubject<number | null>(null);
  private brandFilter$ = new BehaviorSubject<number | null>(null); // Nuevo filtro
  private searchFilter$ = new BehaviorSubject<string>('');
  private loading$ = new BehaviorSubject<boolean>(false);
  private displayCount$ = new BehaviorSubject<number>(20);
  private pageSize$ = new BehaviorSubject<number>(20);

  constructor(private apiService: ApiService) {
    this.loadProducts();
  }

  private loadProducts() {
    this.loading$.next(true);
    this.apiService.getProducts().pipe(
      tap(products => {
        this.products$.next(products);
        this.loading$.next(false);
      })
    ).subscribe();
  }

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  getFilteredProducts(): Observable<Product[]> {
    return combineLatest([
      this.products$,
      this.categoryFilter$,
      this.brandFilter$, // Incluimos el filtro por marca
      this.searchFilter$
    ]).pipe(
      map(([products, category, brand, search]) => {
        return products.filter(product => {
          if (product.cantidad === 0) return false;

          const matchesCategory = !category || 
            product.categorias.some(cat => cat.idcategoria === category);
          const matchesBrand = !brand || 
            (product.marca && product.marca.idmarca === brand);
          const searchTerm = search.toLowerCase().trim();
          const matchesSearch = !searchTerm || 
            product.nombre.toLowerCase().includes(searchTerm) ||
            product.descripcion?.toLowerCase().includes(searchTerm);
          return matchesCategory && matchesBrand && matchesSearch;
        });
      })
    );
  }

  getDisplayedProducts(): Observable<Product[]> {
    return combineLatest([
      this.getFilteredProducts(),
      this.displayCount$
    ]).pipe(
      map(([products, count]) => products.slice(0, count))
    );
  }

  getBrands(): Observable<Marca[]> {
    return this.apiService.getBrands();
  }

  hasMoreProducts(): Observable<boolean> {
    return combineLatest([
      this.getFilteredProducts(),
      this.displayCount$
    ]).pipe(
      map(([products, count]) => products.length > count)
    );
  }

  setPageSize(size: number) {
    this.pageSize$.next(size);
  }

  resetDisplayCount() {
    this.displayCount$.next(this.pageSize$.value);
  }

  increaseDisplayCount() {
    const currentCount = this.displayCount$.value;
    this.displayCount$.next(currentCount + this.pageSize$.value);
  }

  setCategoryFilter(categoryId: number | null) {
    this.categoryFilter$.next(categoryId);
    this.resetDisplayCount();
  }

  setBrandFilter(brandId: number | null) {
    this.brandFilter$.next(brandId);
    this.resetDisplayCount();
  }

  setSearchFilter(term: string) {
    this.searchFilter$.next(term);
    this.resetDisplayCount();
  }

  refreshProducts() {
    this.loadProducts();
  }
  
  isLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }
}