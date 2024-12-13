import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="pt-16">
      <div class="relative h-[60vh] bg-gray-900">
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');">
          <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div class="relative container-custom h-full flex items-center">
          <div class="text-white">
            <h1 class="text-4xl md:text-6xl font-retro mb-4">Bienvenido a Style Boutique</h1>
            <p class="text-xl mb-8">Descubre las últimas tendencias de la moda</p>
            <a routerLink="/products" class="btn btn-primary">Ir de compras</a>
          </div>
        </div>
      </div>

      <section class="py-12 bg-gray-50">
        <div class="container-custom">
          <h2 class="text-3xl font-bold text-center mb-8">Categorías destacadas</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div *ngFor="let category of categories$ | async" 
              class="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer"
              (click)="navigateToCategory(category.idcategoria)">
              <img [src]="getCategoryImage(category)" alt="{{ category.categoria }}" 
                class="w-full h-40 object-cover rounded mb-4">
              <h3 class="font-semibold">{{ category.categoria }}</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent {
  categories$ = this.categoryService.getCategories();
  
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {}

  getCategoryImage(category: any): string {
    // You should implement a proper mapping of category images
    return `assets/categorias/${category.categoria.toLowerCase()}.jpg`;
  }

  navigateToCategory(categoryId: number) {
    this.productService.setCategoryFilter(categoryId);
    this.router.navigate(['/products']);
  }
}