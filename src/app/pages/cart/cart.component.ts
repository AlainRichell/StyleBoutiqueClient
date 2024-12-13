import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { QuantityControlComponent } from '../../shared/components/quantity-control/quantity-control.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, QuantityControlComponent, FormsModule],
  providers: [CurrencyPipe],
  template: `
    <div class="pt-16 container-custom py-8">
      <h1 class="text-3xl font-bold mb-8 mt-8">Carrito de compras</h1>

      <div class="bg-white rounded-lg shadow-md p-6">
        <ng-container *ngIf="cartService.getItems() | async as items">
          <div *ngIf="items.length === 0" class="text-center py-8">
            <p class="text-gray-600 mb-4 font-montserrat">Añade algo al carrito</p>
            <a routerLink="/products" class="btn btn-primary font-montserrat">Seguir comprando</a>
          </div>

          <ng-container *ngIf="items.length > 0">
            <div class="space-y-4">
              <div *ngFor="let item of items" class="flex items-center justify-between border-b pb-4">
                <div class="flex items-center space-x-4">
                  <img 
                    [src]="getItemImage(item)" 
                    [alt]="item.nombre" 
                    class="w-16 h-16 object-cover rounded"
                    (error)="onImageError($event)">
                  <div>
                    <h3 class="font-gobold">{{ item.nombre }}</h3>
                    <p class="text-gray-600 font-montserrat">Precio: {{ item.precio | currency }}</p>
                    <app-quantity-control
                      [quantity]="item.cartQuantity"
                      [max]="item.cantidad"
                      (quantityChange)="updateQuantity(item.idproducto, $event)">
                    </app-quantity-control>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <span class="font-bold font-montserrat">{{ item.precio * item.cartQuantity | currency }}</span>
                  <button 
                    (click)="cartService.removeFromCart(item.idproducto)"
                    class="text-red-500 hover:text-red-700">
                    <span class="material-icons">delete</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-8">
              <form (ngSubmit)="sendOrder(items)" class="space-y-4">
                <div>
                  <input 
                    [(ngModel)]="fullName" 
                    name="fullName" 
                    placeholder="Nombre completo" 
                    class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50 {{ fullNameError ? 'border-red-500' : 'border-gray-300' }}" 
                    (blur)="validateFullName()" 
                    required>
                  <p *ngIf="fullNameError" class="text-red-500 text-sm mt-1">Su nombre es requerido.</p>
                </div>

                <div>
                  <input 
                    [(ngModel)]="address" 
                    name="address" 
                    placeholder="Dirección" 
                    class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50 {{ addressError ? 'border-red-500' : 'border-gray-300' }}" 
                    (blur)="validateAddress()" 
                    required>
                  <p *ngIf="addressError" class="text-red-500 text-sm mt-1">La dirección es requerida.</p>
                </div>

                <div class="flex justify-between items-center">
                  <div class="text-lg font-gobold">
                    Total: {{ calculateTotal(items) | currency }}
                  </div>
                  <button class="btn btn-primary font-montserrat">
                    Hacer el pedido
                  </button>
                </div>
              </form>
            </div>
          </ng-container>
        </ng-container>
      </div>
    </div>
  `
})
export class CartComponent {
  private fallbackImage = 'assets/images/placeholder.jpg';
  fullName = ''; // For capturing the full name
  address = ''; // For capturing the address
  fullNameError = false;
  addressError = false;

  constructor(public cartService: CartService, private http: HttpClient) {}

  validateFullName() {
    this.fullNameError = !this.fullName.trim();
  }

  validateAddress() {
    this.addressError = !this.address.trim();
  }

  calculateTotal(items: any[]): number {
    return items.reduce((total, item) => total + (item.precio * item.cartQuantity), 0);
  }

  getItemImage(item: any): string {
    return item.imagenes?.length > 0 ? item.imagenes[0].imagen : this.fallbackImage;
  }

  onImageError(event: any) {
    event.target.src = this.fallbackImage;
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  async sendOrder(items: any[]) {
    this.validateFullName();
    this.validateAddress();

    if (this.fullNameError || this.addressError) {
      return;
    }

    const codigoRef = localStorage.getItem('codigo_ref');
    let referred = '';

    if (codigoRef) {
      referred = await this.http
        .get<{ nombre: string }>(`${environment.apiUrl}/afiliados/codigo/${codigoRef}`)
        .toPromise()
        .then((response) => response?.nombre || ' -')
        .catch(() => ' -');
    }

    const orderDetails = items
      .map(
        (item) =>
          `* ${item.nombre} (Cantidad: ${item.cartQuantity})`
      )
      .join('\n');

    const total = this.calculateTotal(items);

    const message = `
  Mi pedido:\n${orderDetails}
Total: ${total}$
Nombre: ${this.fullName}
Dirección: ${this.address}
Referido: ${referred}
`.trim();



    const whatsappURL = `https://wa.me/${environment.wanumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, '_blank');
  }
}
