export interface Product {
  id: string
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  color: string
  accent: string
  tag: string
}

export interface CartItem extends Product {
  cantidad: number
}
