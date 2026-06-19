import { Product } from '../types'

export const PRODUCTS: Product[] = [
  {
    id: 'oreo',
    nombre: 'Oreo',
    descripcion: 'Capas de crema suave con Oreos enteras y trituradas. Lo crocante y cremoso en perfecta armonía artesanal.',
    precio: 1800,
    imagen: '/oreo.jpg',
    color: '#0d0d1a',
    accent: '#d8d8d8',
    tag: 'Clásico',
  },
  {
    id: 'tiramisu',
    nombre: 'Tiramisú',
    descripcion: 'Mascarpone importado, café espresso y cacao amargo. La receta italiana auténtica, preparada cada día.',
    precio: 2200,
    imagen: '/tiramisu.jpg',
    color: '#1a0d05',
    accent: '#c9903a',
    tag: 'Italiano',
  },
  {
    id: 'chocotorta',
    nombre: 'Chocotorta',
    descripcion: 'Chocolinas, dulce de leche y crema en capas generosas. La reina argentina que nunca defrauda.',
    precio: 1600,
    imagen: '/chocotorta.jpg',
    color: '#130806',
    accent: '#b5712a',
    tag: 'Argentina',
  },
]
