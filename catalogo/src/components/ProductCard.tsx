import { useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { Product } from '../types'
import { useCart } from '../context/CartContext'

interface Props {
  product: Product
  isActive: boolean
  anyActive: boolean
  onActivate: () => void
  onDeactivate: () => void
  isMobile: boolean
}

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]

export default function ProductCard({ product, isActive, anyActive, onActivate, onDeactivate, isMobile }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const imgX = useTransform(mouseX, [-1, 1], [-8, 8])
  const imgY = useTransform(mouseY, [-1, 1], [-6, 6])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current || isMobile) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width * 2 - 1)
    mouseY.set((e.clientY - rect.top) / rect.height * 2 - 1)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
    if (!isMobile) onDeactivate()
  }

  function handleAddToCart() {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div
      ref={cardRef}
      className="relative w-full h-full overflow-hidden cursor-pointer select-none"
      onMouseEnter={() => !isMobile && onActivate()}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={() => isMobile && (isActive ? onDeactivate() : onActivate())}
      style={{ backgroundColor: product.color }}
      role="article"
      aria-label={product.nombre}
    >
      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 z-10"
        style={{ background: product.accent }}
        animate={{ scaleX: isActive ? 1 : 0.3, opacity: isActive ? 1 : 0.4 }}
        transition={{ duration: 0.4, ease: EASE }}
      />

      {/* Ghost number */}
      <div
        className="absolute bottom-4 right-4 font-display font-black leading-none pointer-events-none select-none"
        style={{ fontSize: 'clamp(80px, 12vw, 140px)', color: `${product.accent}08` }}
      >
        {product.id === 'oreo' ? '01' : product.id === 'tiramisu' ? '02' : '03'}
      </div>

      {/* Rotated product name — left edge */}
      <motion.div
        className="absolute left-6 top-1/2 pointer-events-none z-10"
        style={{ transform: 'translateY(-50%) rotate(180deg)', writingMode: 'vertical-rl' }}
        animate={{ opacity: isActive ? 0.08 : 0.7 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <span
          className="font-display font-black uppercase tracking-widest whitespace-nowrap"
          style={{ fontSize: 'clamp(22px, 3vw, 44px)', color: product.accent }}
        >
          {product.nombre}
        </span>
      </motion.div>

      {/* Product tag — top right */}
      <div className="absolute top-8 right-8 z-10">
        <motion.span
          className="font-sans uppercase"
          style={{ fontSize: 10, letterSpacing: '0.28em', color: `${product.accent}90` }}
          animate={{ opacity: isActive ? 1 : 0.5 }}
        >
          {product.tag}
        </motion.span>
      </div>

      {/* IMAGE — centered with parallax */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center pointer-events-none"
        style={{ x: imgX, y: imgY, paddingBottom: 20, paddingLeft: 40 }}
      >
        <motion.img
          src={product.imagen}
          alt={product.nombre}
          className="object-contain w-auto select-none"
          draggable={false}
          animate={{
            height: isActive ? '68%' : '56%',
            opacity: anyActive && !isActive ? 0.5 : 1,
            filter: isActive
              ? 'drop-shadow(0 24px 48px rgba(0,0,0,0.7)) brightness(1.05)'
              : 'drop-shadow(0 8px 24px rgba(0,0,0,0.5)) brightness(0.9)',
          }}
          transition={{ duration: 0.55, ease: EASE }}
        />
      </motion.div>

      {/* CONTENT on expand */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-20 p-8"
            style={{ background: `linear-gradient(to top, ${product.color} 60%, transparent)` }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <motion.h2
              className="font-display font-black text-white leading-tight mb-2"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {product.nombre}
            </motion.h2>

            <motion.div
              className="h-px w-10 mb-3"
              style={{ background: product.accent, transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />

            <motion.p
              className="font-sans font-light text-white/65 mb-5 leading-relaxed"
              style={{ fontSize: 'clamp(12px, 1.1vw, 14px)', maxWidth: '28ch' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              {product.descripcion}
            </motion.p>

            <motion.div
              className="flex items-end gap-5 flex-wrap"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div>
                <span className="font-sans block uppercase text-white/40 mb-0.5" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
                  Desde
                </span>
                <span className="font-display font-bold text-white/90" style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}>
                  ${product.precio.toLocaleString('es-AR')}
                </span>
              </div>

              <motion.button
                className="font-sans font-semibold uppercase flex items-center gap-2.5"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  padding: '13px 24px',
                  background: added ? '#22c55e' : product.accent,
                  color: added ? '#fff' : '#0a0a0a',
                  transition: 'background 0.3s',
                }}
                onClick={(e) => { e.stopPropagation(); handleAddToCart() }}
                whileTap={{ scale: 0.97 }}
                aria-label={`Agregar ${product.nombre} al carrito`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span key="check" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      ¡Agregado!
                    </motion.span>
                  ) : (
                    <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      Agregar al carrito
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Separator */}
      <div className="absolute top-0 right-0 bottom-0 w-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
    </div>
  )
}
