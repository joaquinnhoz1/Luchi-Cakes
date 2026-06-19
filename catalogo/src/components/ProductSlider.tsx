import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ProductCard from './ProductCard'
import { Product } from '../types'

interface Props {
  products: Product[]
}

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]

export default function ProductSlider({ products }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!isMobile || !containerRef.current) return
    const el = containerRef.current
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / el.clientWidth)
      setActiveId(products[idx]?.id ?? null)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [isMobile, products])

  function getFlexValue(productId: string) {
    if (isMobile) return undefined
    if (activeId === productId) return 4
    if (activeId !== null) return 0.55
    return 1
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: '100dvh' }}
      aria-label="Catálogo de postres"
    >
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          ref={containerRef}
          className={[
            'flex h-full w-full',
            isMobile ? 'overflow-x-auto scrollbar-hide snap-x snap-mandatory' : 'overflow-hidden',
          ].join(' ')}
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="relative h-full overflow-hidden flex-shrink-0"
              style={isMobile ? { flex: '0 0 100%', scrollSnapAlign: 'start' } : {}}
              animate={!isMobile ? { flex: getFlexValue(product.id) } : {}}
              transition={{ duration: 0.55, ease: EASE }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            >
              <ProductCard
                product={product}
                isActive={activeId === product.id}
                anyActive={activeId !== null}
                onActivate={() => setActiveId(product.id)}
                onDeactivate={() => setActiveId(null)}
                isMobile={isMobile}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {isMobile && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-30 pointer-events-none">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeId === p.id ? 24 : 6,
                height: 6,
                background: activeId === p.id ? p.accent : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      )}

      {!isMobile && !activeId && isInView && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/30">
            Pasá el cursor para explorar
          </span>
        </motion.div>
      )}
    </section>
  )
}
