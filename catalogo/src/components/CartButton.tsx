import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useEffect, useRef, useState } from 'react'

export default function CartButton() {
  const { count, setIsOpen } = useCart()
  const prevCount = useRef(count)
  const [bump, setBump] = useState(false)

  useEffect(() => {
    if (count > prevCount.current) {
      setBump(true)
      setTimeout(() => setBump(false), 400)
    }
    prevCount.current = count
  }, [count])

  return (
    <motion.button
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 font-sans font-semibold text-[12px] uppercase tracking-[0.12em]"
      style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.18)',
        color: '#fff',
        padding: '14px 24px',
      }}
      whileHover={{ scale: 1.03, background: 'rgba(255,255,255,0.14)' }}
      whileTap={{ scale: 0.97 }}
      animate={bump ? { scale: [1, 1.12, 1] } : {}}
      transition={{ duration: 0.3 }}
      onClick={() => setIsOpen(true)}
      aria-label={`Abrir carrito, ${count} productos`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>

      Carrito

      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="flex items-center justify-center rounded-full font-bold text-[11px] min-w-[20px] h-5 px-1"
            style={{ background: '#c9903a', color: '#0a0a0a' }}
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
