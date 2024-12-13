import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { Marca } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/productos`).pipe(
      catchError(error => {
        console.error('Error fetching products:', error);
        return [];
      })
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categorias`).pipe(
      catchError(error => {
        console.error('Error fetching categories:', error);
        return [];
      })
    );
  }

  getBrands(): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${environment.apiUrl}/marcas`).pipe(
      catchError(error => {
        console.error('Error fetching brands:', error);
        return [];
      })
    );
  }
}