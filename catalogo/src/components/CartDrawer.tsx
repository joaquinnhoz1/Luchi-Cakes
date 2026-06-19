import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, count, isOpen, setIsOpen } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
            style={{
              width: 'min(420px, 100vw)',
              background: '#0f0f0f',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: EASE }}
            role="dialog"
            aria-label="Carrito de compras"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-7 border-b border-white/10 flex-shrink-0">
              <div>
                <h2 className="font-display font-bold text-white text-xl tracking-wide">
                  Tu Carrito
                </h2>
                <p className="font-sans text-white/40 text-[12px] mt-0.5 tracking-[0.1em] uppercase">
                  {count} {count === 1 ? 'producto' : 'productos'}
                </p>
              </div>
              <button
                className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar carrito"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-full gap-4 text-center px-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
                      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <p className="font-display italic text-white/30 text-lg">
                      Tu carrito está vacío
                    </p>
                    <button
                      className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-white/70 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Seguir explorando →
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0, padding: 0, margin: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="flex items-center gap-4 px-8 py-5 border-b border-white/[0.06]"
                    >
                      {/* Color swatch */}
                      <div
                        className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden"
                        style={{ background: item.color, border: `1px solid ${item.accent}30` }}
                      >
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-white text-sm truncate">
                          {item.nombre}
                        </p>
                        <p className="font-sans text-white/40 text-[12px] mt-0.5">
                          ${item.precio.toLocaleString('es-AR')} c/u
                        </p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white border border-white/15 hover:border-white/40 transition-all text-lg leading-none"
                          onClick={() => updateQty(item.id, item.cantidad - 1)}
                          aria-label="Reducir cantidad"
                        >
                          −
                        </button>
                        <span className="font-sans font-500 text-white text-sm w-5 text-center tabular-nums">
                          {item.cantidad}
                        </span>
                        <button
                          className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white border border-white/15 hover:border-white/40 transition-all text-lg leading-none"
                          onClick={() => updateQty(item.id, item.cantidad + 1)}
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right flex-shrink-0 ml-2">
                        <p className="font-display font-bold text-white text-sm">
                          ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                        </p>
                        <button
                          className="font-sans text-[10px] text-white/25 hover:text-red-400 transition-colors mt-0.5 uppercase tracking-[0.1em]"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Eliminar ${item.nombre}`}
                        >
                          Eliminar
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                className="flex-shrink-0 px-8 py-7 border-t border-white/10 space-y-5"
                layout
              >
                <div className="flex justify-between items-center">
                  <span className="font-sans text-white/50 text-[12px] uppercase tracking-[0.2em]">Total</span>
                  <span className="font-display font-bold text-white text-2xl">
                    ${total.toLocaleString('es-AR')}
                  </span>
                </div>

                <motion.button
                  className="w-full font-sans font-semibold text-[12px] uppercase tracking-[0.16em] py-4 flex items-center justify-center gap-3 transition-all"
                  style={{ background: '#c9903a', color: '#0a0a0a' }}
                  whileHover={{ filter: 'brightness(1.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  Finalizar pedido
                </motion.button>

                <button
                  className="w-full font-sans text-white/35 text-[11px] uppercase tracking-[0.2em] hover:text-white/60 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Seguir comprando
                </button>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
