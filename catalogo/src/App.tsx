import { CartProvider } from './context/CartContext'
import ProductSlider from './components/ProductSlider'
import CartButton from './components/CartButton'
import CartDrawer from './components/CartDrawer'
import { PRODUCTS } from './data/products'

export default function App() {
  return (
    <CartProvider>
      <main className="w-full bg-[#080808]" style={{ minHeight: '100dvh' }}>
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }}
        >
          <a
            href="../index.html"
            className="font-display font-bold text-white text-lg tracking-wide hover:opacity-75 transition-opacity"
          >
            Luchi <em className="font-normal italic opacity-75">Cakes</em>
          </a>
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/35">
            Catálogo
          </span>
        </nav>

        {/* Full-screen slider catalog */}
        <ProductSlider products={PRODUCTS} />

        {/* Floating cart */}
        <CartButton />
        <CartDrawer />
      </main>
    </CartProvider>
  )
}
