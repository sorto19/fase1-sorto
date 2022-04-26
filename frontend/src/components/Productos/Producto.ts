export interface Producto {
  _id?: string;
  nombre: string;
  precio: string;
  cantidad: string;
  description: string;
  categoria: string;

  url: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
