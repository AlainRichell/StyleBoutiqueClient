import { Category } from './category.model';

export interface Product {
  idproducto: number;
  categorias: Category[];
  nombre: string;
  descripcion?: string;
  precio: number;
  cantidad: number;
  imagenes: ProductImage[];
  marca: Marca | null;
  talla: Talla[];
}

export interface ProductImage {
  id: number;
  imagen: string;
  idproducto: number;
}

export interface Marca {
  idmarca: number;
  marca: string;
}

export interface Talla {
  idtalla: number;
  talla: string;
}