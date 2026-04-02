import { Link } from 'react-router-dom'
import { useEffect, useRef, useState, useLayoutEffect, type CSSProperties } from 'react'
import { gsap } from 'gsap'

/* ─── Global State for Cursors ─── */
let setCursorTypeGlobal: (type: 'default' | 'drag' | 'view') => void = () => {}

/* ─── Trovex Logo Component (WQF Translation Pattern) ─── */
function TrovexLogo({ scrolled }: { scrolled: boolean }) {
  return (
    <Link to="/" className="relative isolate h-[30px] w-[120px] shrink-0 overflow-hidden transition-[width] duration-600 ease-[var(--easing)] group-[.scrolled]:w-[30px]" aria-label="Trovex">
      {/* Full Logo (Hides on scroll) */}
      <svg className={`w-full h-auto transition-transform duration-600 ease-[var(--easing)] ${scrolled ? '-translate-y-full' : 'translate-y-0'}`} width="120" height="29" viewBox="0 0 120 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g fill="currentColor">
          <path d="M-0.000183105 0.169922H1.50134L4.4145 9.33658H4.46208L7.24835 0.286492H8.68114L11.4304 9.33658H11.478L14.3964 0.169922H15.7975L12.1653 11.154H10.6638L7.94624 2.32117H7.89866L5.13353 11.154H3.61615L-0.000183105 0.169922Z"/>
          <path d="M19.5565 10.6185C18.7105 10.1522 18.0497 9.48457 17.5633 8.6209C17.0768 7.75722 16.8389 6.75577 16.8389 5.60597C16.8389 4.45616 17.0821 3.49181 17.5633 2.64402C18.0444 1.79094 18.7105 1.13921 19.5565 0.683525C20.4024 0.227842 21.3382 0 22.3745 0C23.4107 0 24.3465 0.227842 25.1925 0.683525C26.0384 1.13921 26.6993 1.79624 27.1857 2.64402C27.6668 3.49711 27.91 4.48265 27.91 5.60597C27.91 6.72928 27.6668 7.75722 27.1857 8.6209C26.7045 9.48457 26.0384 10.1469 25.1925 10.6185C24.3465 11.0848 23.4107 11.3179 22.3745 11.3179C21.3382 11.3179 20.4024 11.0848 19.5565 10.6185Z"/>
          <path d="M30.4057 0.169922H34.9526C35.8514 0.169922 36.6127 0.297089 37.226 0.546126C37.8446 0.795162 38.3045 1.15547 38.6112 1.62175C38.9178 2.08803 39.0712 2.64439 39.0712 3.29082"/>
          <path d="M41.6986 0.169922H43.0997V9.88764H48.8625V11.154H41.6986V0.169922Z"/>
          <path d="M50.9617 0.169922H54.9587C56.0796 0.169922 57.0524 0.392465 57.8719 0.826954C58.6914 1.26674 59.3258 1.89728 59.7646 2.72387"/>
          <path d="M65.1362 10.6185C64.2903 10.1522 63.6294 9.48457 63.143 8.62089"/>
          <path d="M78.0841 10.7937C77.3862 10.444 76.847 9.95122 76.4663 9.31538V0.169922H77.3016"/>
        </g>
      </svg>
      {/* Icon (Shows on scroll) */}
      <svg className={`absolute top-0 left-0 w-[30px] h-auto transition-transform duration-600 ease-[var(--easing)] ${scrolled ? 'translate-y-0' : 'translate-y-full'}`} width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M39.13 43.55C39.13 41.0371 41.1671 39 43.68 39H47.45C49.9629 39 52 36.9629 52 34.45L52 4.55C52 2.03711 54.0371 0 56.55 0L60.45 0C62.9629 0 65 2.03711 65 4.55001V34.45C65 36.9629 62.9629 39 60.45 39H56.68C54.1671 39 52.13 41.0371 52.13 43.55L52.13 60.45C52.13 62.9629 50.0929 65 47.58 65L43.68 65C41.1671 65 39.13 62.9629 39.13 60.45L39.13 43.55Z" fill="currentColor"/>
        <path d="M13.13 43.55C13.13 41.0371 15.1671 39 17.68 39H21.45C23.9629 39 26 36.9629 26 34.45L26 4.55C26 2.03711 28.0371 0 30.55 0L34.45 0C36.9629 0 39 2.03711 39 4.55L39 34.45C39 36.9629 36.9629 39 34.45 39H30.68C28.1671 39 26.13 41.0371 26.13 43.55L26.13 60.45C26.13 62.9629 24.0929 65 21.58 65H17.68C15.1671 65 13.13 62.9629 13.13 60.45L13.13 43.55Z" fill="currentColor"/>
        <path d="M0 4.55C0 2.0371 2.03711 0 4.55 0L8.45 0C10.9629 0 13 2.0371 13 4.55V21.45C13 23.9629 10.9629 26 8.45 26H4.55C2.0371 26 0 23.9629 0 21.45L0 4.55Z" fill="currentColor"/>
      </svg>
    </Link>
  )
}

/* ─── Corner Accents (WQF SVG Pattern) ─── */
function CornerAccents({ color = 'currentColor' }: { color?: string }) {
  return (
    <>
      <svg className="absolute -top-px -left-px size-[30px]" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d="M30 1H1V30" stroke="currentColor"/>
      </svg>
      <svg className="absolute -top-px -right-px size-[30px] rotate-90" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d="M30 1H1V30" stroke="currentColor"/>
      </svg>
      <svg className="absolute -bottom-px -left-px size-[30px] -rotate-90" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d="M30 1H1V30" stroke="currentColor"/>
      </svg>
      <svg className="absolute -bottom-px -right-px size-[30px] rotate-180" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d="M30 1H1V30" stroke="currentColor"/>
      </svg>
    </>
  )
}


/* ─── WQF Button ─── */
function WQFButton({ label, href, theme = 'dark', onClick }: { label: string; href?: string; theme?: 'dark' | 'light'; onClick?: () => void }) {
  const textColor = theme === 'light' ? 'var(--color-rich-carbon)' : 'var(--color-off-white)'
  const accentColor = theme === 'light' ? 'rgba(17,17,17,0.1)' : 'rgba(231,231,231,0.1)'

  const inner = (
    <div className="group/button relative isolate overflow-hidden" style={{ cursor: 'pointer' }}>
      <div className="flex h-[40px] items-center justify-center px-[24px]">
        <div className="absolute left-[12px] size-[8px] rounded-[2px] opacity-0 blur-[8px] transition-all duration-400 group-hover/button:opacity-100 group-hover/button:blur-0 group-hover/button:-translate-x-[4px]"
          style={{ background: 'var(--color-infrared)', transform: 'translateX(-20px)', transitionTimingFunction: 'var(--easing)' }}
        />
        <div className="relative flex overflow-hidden group-hover/button:translate-x-[6px] transition-transform duration-400" 
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: textColor, transitionTimingFunction: 'var(--easing)' }}>
          <span className="flex transition-transform duration-400 group-hover/button:-translate-y-full" style={{ transitionTimingFunction: 'var(--easing)' }}>{label}</span>
          <span className="absolute inset-0 flex transition-transform duration-400 translate-y-full group-hover/button:translate-y-0" aria-hidden="true" style={{ transitionTimingFunction: 'var(--easing)' }}>{label}</span>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <CornerAccents color={accentColor} />
      </div>
    </div>
  )
  if (href) return <Link to={href} className="no-underline">{inner}</Link>
  return <button onClick={onClick} className="border-none bg-transparent p-0">{inner}</button>
}

/* ─── Section Header ─── */
function SectionHeader({ label, heading, description, theme = 'dark' }: { label: string; heading: string; description: string; theme?: 'dark' | 'light' }) {
  const borderColor = theme === 'dark' ? 'rgba(231,231,231,0.1)' : 'rgba(17,17,17,0.1)'
  const textMuted = theme === 'dark' ? 'rgba(231,231,231,0.6)' : 'rgba(17,17,17,0.6)'
  return (
    <div className="flex flex-col items-start gap-[32px] lg:gap-[40px]">
      <div className="flex w-full flex-col gap-[16px] pb-[16px]" style={{ borderBottom: `1px solid ${borderColor}` }}>
        <h2 className="p3-mono text-neural-fog uppercase tracking-[0.15em]">{label}</h2>
        <p className="uppercase text-off-white font-medium leading-[0.9] tracking-tighter" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
          {heading.split('\\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </p>
      </div>
      <p className="p1-mono transition-colors max-w-[600px] leading-relaxed" style={{ color: textMuted }}>{description}</p>
    </div>
  )
}


/* ─── Custom Cursors ─── */
function WQFCursors() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [type, setType] = useState<'default' | 'drag' | 'view'>('default')

  setCursorTypeGlobal = setType

  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const isVisible = type !== 'default'

  return (
    <div className={`fixed top-0 left-0 z-[3000] pointer-events-none transition-all duration-500 ease-[var(--easing)] ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate3d(-50%, -50%, 0)`,
      }}>
      <div className={`relative isolate flex items-center justify-center overflow-hidden rounded-full transition-all duration-500 ease-[var(--easing)] ${type === 'view' ? 'size-[100px] bg-off-white text-rich-carbon' : 'size-[80px] bg-rich-carbon text-off-white border border-white/20'}`}>
        <div className="flex flex-col items-center gap-[2px]">
          <span className="p3-mono font-bold tracking-[0.1em]">{type.toUpperCase()}</span>
          <div className={`size-[4px] rounded-full mt-[4px] transition-transform duration-500 ${type === 'view' ? 'bg-rich-carbon scale-100' : 'bg-infrared scale-100'}`} />
        </div>
      </div>
    </div>
  )
}


function useCursor(type: 'drag' | 'view') {
  return {
    onMouseEnter: () => setCursorTypeGlobal(type),
    onMouseLeave: () => setCursorTypeGlobal('default'),
  }
}

/* ─── Transition Utils ─── */
function FadeIn({ children, className = '', delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.8s var(--easing) ${delay}s, transform 0.8s var(--easing) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

/* ─── Landing Page ─── */
const ethosCards = [
  { num: '01', title: 'Exponential Foresight', desc: 'Decoding the next decade of category-defining infrastructure through quantitative predictive models.' },
  { num: '02', title: 'Full-stack Support', desc: 'Deploying high-frequency engineering and institutional capital to accelerate terminal velocity.' },
  { num: '03', title: 'Institutional Liquidity', desc: 'The bridge between legacy markets and the next frontier of collectible digital assets.' },
  { num: '04', title: 'Absolute Transparency', desc: 'Real-time performance auditability of every asset within the Trovex ecosystem.' },
]

const focusAreas = [
  { id: '01', title: 'Advanced Mobility', desc: 'Autonomous logistics and supply-chain efficiency modules.' },
  { id: '02', title: 'Artificial Intelligence', desc: 'Deep-learning predictive models for market sentiment and asset valuation.' },
  { id: '03', title: 'Biotechnology & Genomics', desc: 'Molecular-level data synchronization for health and longevity research.' },
  { id: '04', title: 'Blockchain & DeFi', desc: 'Decentralized settlement layers for ultra-low latency exchange.' },
  { id: '05', title: 'Next-Gen Finance', desc: 'Institutional grade tools for the modern collectible asset class.' },
  { id: '06', title: 'Robotics', desc: 'Hardware-software convergence for physical asset management.' },
]

const portfolioCases = [
  { name: 'ALPHA DEAL', tag: 'Private asset analysis, reimagined', site: 'alphadeal.io' },
  { name: 'PULSE ASH', tag: 'High-frequency sentiment indexing', site: 'pulseash.terminal' },
  { name: 'URBAN SMOKE', tag: 'Decentralized asset custody platform', site: 'urbansmoke.sh' },
  { name: 'NEURAL FOG', tag: 'Generative market forecasting', site: 'neuralfog.ai' },
]

const leadershipTeam = [
  { name: 'Igor Trovex', role: 'Founder & Visionary', bio: 'Strategic lead with 15+ years in institutional infrastructure.' },
  { name: 'Amir Volkov', role: 'Chief Quantitative Officer', bio: 'Expert in algorithmic asset valuation and market dynamics.' },
  { name: 'Steven Ash', role: 'Head of Engineering', bio: 'Pioneered low-latency settlement layers for global exchanges.' },
]

const investorCards = [
  { num: '01', title: 'Foresight that converts', desc: 'Predictive intelligence that identifies alpha before market saturation.' },
  { num: '02', title: 'Vetted and supported', desc: 'Every portfolio company undergoes rigorous institutional stress-testing.' },
  { num: '03', title: 'Transparent & Accel.', desc: 'High-frequency reporting and accelerated liquidity pathways.' },
]

export function Landing() {
  const [headerState, setHeaderState] = useState({ scrolled: false, hidden: false, mobileOpen: false })
  const [contactOpen, setContactOpen] = useState(false)
  const [expandedFocus, setExpandedFocus] = useState<string | null>(null)
  const lastScrollY = useRef(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const part1Ref = useRef<HTMLHeadingElement>(null)
  const part2Ref = useRef<HTMLHeadingElement>(null)
  const portfolioScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current
      setHeaderState(prev => ({
        ...prev,
        scrolled: currentY > 200,
        hidden: currentY > 500 && delta > 50,
      }))
      if (Math.abs(delta) > 50) lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* ─── Portfolio Horizontal Scroll logic ─── */
  useEffect(() => {
    const el = portfolioScrollRef.current
    if (!el) return
    const onScroll = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      el.scrollLeft += e.deltaY
    }
    el.addEventListener('wheel', onScroll)
    return () => el.removeEventListener('wheel', onScroll)
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 })
      tl.fromTo([part1Ref.current, part2Ref.current], { opacity: 0, y: 60, filter: 'blur(20px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, stagger: 0.3, ease: 'expo.out' })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-core-black text-white font-display antialiased leading-relaxed">
      <WQFCursors />

      {/* ════════════════════════════════════════════
          CONTACT MODAL (Component 13)
          ════════════════════════════════════════════ */}
      <div className={`fixed inset-0 z-[2000] flex bg-rich-carbon/40 backdrop-blur-[10px] transition-opacity duration-400 ${contactOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`bg-neural-fog text-rich-carbon relative isolate h-full w-full max-w-[700px] overflow-y-auto px-[16px] pt-[32px] md:rounded-r-[20px] md:p-[40px] transition-transform duration-400 ease-[var(--easing)] ${contactOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <button className="text-rich-carbon/60 hover:text-rich-carbon absolute top-[24px] right-[24px] transition-colors" onClick={() => setContactOpen(false)}>
            <svg className="size-[16px]" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 14.8696C0 14.1844 0.555 13.6289 1.241 13.6289L2.302 13.6289C2.988 13.6289 3.543 13.0734 3.543 12.3882V11.5024C3.543 10.8172 4.098 10.2617 4.784 10.2617L5.228 10.2617C5.913 10.2617 6.469 9.706 6.469 9.021V7.957C6.469 7.272 7.024 6.717 7.709 6.717H8.187C8.872 6.717 9.428 6.161 9.428 5.476V4.713C9.428 4.028 9.983 3.473 10.668 3.473H11.484C12.169 3.473 12.725 2.917 12.725 2.232V1.241C12.725 0.555 13.28 0 13.965 0H15.029C15.714 0 16.27 0.555 16.27 1.241V2.304C16.27 2.989 15.714 3.545 15.029 3.545H14.213C13.528 3.545 12.973 4.1 12.973 4.786V5.777C12.973 6.462 12.417 7.018 11.732 7.018H11.254C10.569 7.018 10.014 7.573 10.014 8.258V9.021C10.014 9.706 9.458 10.262 8.773 10.262H8.329C7.643 10.262 7.088 10.817 7.088 11.502V12.566C7.088 13.251 6.532 13.807 5.847 13.807H4.786C4.1 13.807 3.545 14.362 3.545 15.047V15.933C3.545 16.618 2.99 17.174 2.304 17.174H1.241C0.555 17.174 0 16.618 0 15.933V14.869z" fill="currentColor"/>
            </svg>
          </button>
          
          <div className="flex h-full flex-col justify-between gap-[40px]">
            <h2 className="h2 flex flex-wrap gap-x-[0.3ch] uppercase">
              {"Talk to the Trovex team.".split(" ").map((word, i) => (
                <span key={i} className="contents">
                  <span>{word}</span>
                  {i === 1 && (
                    <div className="-mt-[0.075ch] h-[1.5ch] w-[4ch] shrink-0 bg-cover grayscale" 
                         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')" }} />
                  )}
                </span>
              ))}
            </h2>

            <form className="flex flex-col gap-[32px] md:gap-[40px]" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
                <div className="flex flex-col gap-[8px] border-b border-rich-carbon/20 pb-[8px]">
                  <label className="p3-mono text-rich-carbon/60 uppercase">First Name *</label>
                  <input type="text" className="bg-transparent border-none text-rich-carbon outline-none h-[40px] text-[1.25rem]" placeholder="Igor" required />
                </div>
                <div className="flex flex-col gap-[8px] border-b border-rich-carbon/20 pb-[8px]">
                  <label className="p3-mono text-rich-carbon/60 uppercase">Last Name *</label>
                  <input type="text" className="bg-transparent border-none text-rich-carbon outline-none h-[40px] text-[1.25rem]" placeholder="Trovex" required />
                </div>
              </div>
              <div className="flex flex-col gap-[8px] border-b border-rich-carbon/20 pb-[8px]">
                <label className="p3-mono text-rich-carbon/60 uppercase">Email Address *</label>
                <input type="email" className="bg-transparent border-none text-rich-carbon outline-none h-[40px] text-[1.25rem]" placeholder="igor@trovex.io" required />
              </div>
              <div className="flex flex-col gap-[8px] border-b border-rich-carbon/20 pb-[8px]">
                <label className="p3-mono text-rich-carbon/60 uppercase">Message</label>
                <textarea className="bg-transparent border-none text-rich-carbon outline-none min-h-[80px] text-[1.25rem] resize-none" placeholder="Build with us..." />
              </div>
              
              <div className="flex items-center gap-[12px]">
                <input type="checkbox" id="privacy" className="size-[16px]" required />
                <label htmlFor="privacy" className="p3-mono text-rich-carbon/60">I AGREE TO THE PRIVACY POLICY</label>
              </div>

              <WQFButton label="Send message" onClick={() => {}} theme="light" />
            </form>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════
          WQF HEADER refinement (Component 01)
          ════════════════════════════════════════════ */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-400 ease-[var(--easing)] h-[var(--header-height)] ${headerState.hidden ? '-translate-y-full' : 'translate-y-0'} ${headerState.scrolled ? 'bg-core-black/90 backdrop-blur-[10px]' : 'bg-transparent'}`}>
        <div className="container h-full flex items-center justify-between">
          <TrovexLogo scrolled={headerState.scrolled} />
          
          <nav className="hidden lg:flex items-center">
            {['Ethos', 'Portfolio', 'Founders', 'Contact'].map(item => (
              <a key={item} 
                href={item === 'Contact' ? '#' : `#${item.toLowerCase()}`} 
                onClick={item === 'Contact' ? (e) => { e.preventDefault(); setContactOpen(true) } : undefined}
                className="group/link block relative isolate motion-safe:hover:animate-glitch-hover h-[40px]">
                <div className="flex h-full items-center px-[20px]">
                  <div className="bg-neural-fog size-[10px] -translate-x-[24px] rounded-[3px] opacity-0 blur-[20px] transition-all duration-400 ease-[var(--easing)] group-hover/link:-translate-x-[5px] group-hover/link:opacity-100 group-hover/link:blur-[0px]" />
                  <div className="p2-mono relative isolate flex overflow-hidden transition-transform duration-400 ease-[var(--easing)] -translate-x-[5px] group-hover/link:translate-x-[5px]">
                    <span className="transition-transform duration-400 ease-[var(--easing)] group-hover/link:-translate-y-full uppercase">{item}</span>
                    <span className="absolute inset-0 translate-y-full transition-transform duration-400 ease-[var(--easing)] group-hover/link:translate-y-0 uppercase" aria-hidden="true">{item}</span>
                  </div>
                </div>
              </a>
            ))}
          </nav>

          <button className="lg:hidden p2-mono" onClick={() => setHeaderState(p => ({ ...p, mobileOpen: !p.mobileOpen }))}>MENU</button>
        </div>
      </header>

      {/* ════════════════════════════════════════════
          WQF HERO (Component 02)
          ════════════════════════════════════════════ */}
      <section className="relative h-dvh w-full overflow-hidden" style={{ background: 'var(--color-core-black)' }}>
        <div className="absolute inset-0 z-0 pointer-events-none" 
          style={{ backgroundImage: "url('/src/assets/hero_landscape.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'luminosity', filter: 'brightness(0.3)' }} />
        
        <div ref={heroRef} className="container relative z-10 h-full flex flex-col py-0">
          <div className="relative flex-1 flex flex-col justify-between py-[12vh] md:py-[18vh]">
            
            {/* Top Left Text Block */}
            <div className="flex flex-col items-start max-w-full md:max-w-[80vw]">
              <h1 ref={part1Ref} className="h1-hero text-off-white opacity-0">
                Building<br />
                The Exchange<br />
                That
              </h1>
            </div>

            {/* Bottom Right Text Block */}
            <div className="flex flex-col items-end text-right mt-auto">
              <h1 ref={part2Ref} className="h1-hero text-off-white opacity-0">
                Pulls Collectibles<br />
                Out of the dark ages
              </h1>
            </div>
          </div>

          {/* Hero Footer Bar */}
          <div className="w-full mt-auto">
            <FadeIn delay={2.3}>
              <div className="w-full h-px bg-white/10 mb-[24px]" />
            </FadeIn>
            
            <div className="flex flex-col md:flex-row justify-between items-end gap-[32px] pb-[32px]">
              {/* Bottom Left: Contact Us */}
              <FadeIn delay={2.5} className="w-full md:w-auto">
                <div className="flex items-center gap-[12px]">
                  <WQFButton label="Contact Us" onClick={() => setContactOpen(true)} theme="dark" />
                </div>
              </FadeIn>

              {/* Bottom Right: Description & Logo */}
              <div className="flex flex-col md:flex-row items-end gap-[24px] md:gap-[40px] max-w-[800px]">
                <FadeIn delay={2.7} className="flex flex-col items-end">
                  <p className="p-hero-footer text-neural-fog text-right max-w-[440px]">
                    Trovex is the reimagined exchange protocol. Deploying institutional alpha to the collectible asset class at scale. We provide the technical bedrock for the next generation.
                  </p>
                </FadeIn>
                
                <FadeIn delay={2.9} className="shrink-0 text-white opacity-40 hover:opacity-100 transition-opacity hidden md:block">
                   <svg width="60" height="60" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39.13 43.55C39.13 41.0371 41.1671 39 43.68 39H47.45C49.9629 39 52 36.9629 52 34.45L52 4.55C52 2.03711 54.0371 0 56.55 0L60.45 0C62.9629 0 65 2.03711 65 4.55001V34.45C65 36.9629 62.9629 39 60.45 39H56.68C54.1671 39 52.13 41.0371 52.13 43.55L52.13 60.45C52.13 62.9629 50.0929 65 47.58 65L43.68 65C41.1671 65 39.13 62.9629 39.13 60.45L39.13 43.55Z" fill="currentColor"/>
                    <path d="M13.13 43.55C13.13 41.0371 15.1671 39 17.68 39H21.45C23.9629 39 26 36.9629 26 34.45L26 4.55C26 2.03711 28.0371 0 30.55 0L34.45 0C36.9629 0 39 2.03711 39 4.55L39 34.45C39 36.9629 36.9629 39 34.45 39H30.68C28.1671 39 26.13 41.0371 26.13 43.55L26.13 60.45C26.13 62.9629 24.0929 65 21.58 65H17.68C15.1671 65 13.13 62.9629 13.13 60.45L13.13 43.55Z" fill="currentColor"/>
                  </svg>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ETHOS & VALUE PROPS (Component 03/04)
          ════════════════════════════════════════════ */}

      <section id="ethos" className="section-padding bg-rich-carbon">
        <div className="container">
          <SectionHeader label="Our Ethos" heading="Vision matters.\nVelocity wins." description="We are the technical bridge. Precision. Alpha. Infrastructure." />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-[1px] bg-white/[0.05] border border-white/[0.05] mt-[80px]">
            {ethosCards.map((card, i) => (
              <FadeIn key={i} delay={i * 0.1} className="bg-rich-carbon p-[40px] flex flex-col gap-[32px] group">
                <div className="flex justify-between items-start">
                  <span className="p3-mono text-pulse-ash">{card.num} / 04</span>
                  <div className="size-[10px] bg-infrared opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="mt-auto">
                  <h3 className="h3-card mb-[16px]">{card.title}</h3>
                  <p className="p2-mono text-pulse-ash lowercase leading-relaxed group-hover:text-neural-fog transition-colors">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOCUS AREAS (Component 05) - Expandable
          ════════════════════════════════════════════ */}
      <section className="section-padding bg-core-black">
        <div className="container">
          <SectionHeader label="Our Focus" heading="Exponential Technologies" description="Category-defining modules for trillion-dollar efficiency." />
          
          <div className="mt-[80px] flex flex-col border-t border-white/[0.1]">
            {focusAreas.map((area) => (
              <div key={area.id} className="border-b border-white/[0.1] overflow-hidden transition-all duration-500 ease-[var(--easing)]"
                onClick={() => setExpandedFocus(expandedFocus === area.id ? null : area.id)}>
                <div className="flex items-center justify-between h-[100px] cursor-pointer group">
                  <span className="h3-card transition-transform group-hover:translate-x-[10px]">{area.title}</span>
                  <span className="p3-mono text-pulse-ash translate-y-[2px]">{expandedFocus === area.id ? '[ - ]' : '[ + ]'}</span>
                </div>
                <div className={`transition-all duration-500 ease-[var(--easing)] ${expandedFocus === area.id ? 'max-h-[200px] pb-[40px]' : 'max-h-0'}`}>
                  <p className="max-w-[600px] p-body text-neural-fog">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PORTFOLIO CAROUSEL (Component 06) - Horizontal
          ════════════════════════════════════════════ */}
      <section id="portfolio" className="section-padding bg-urban-smoke overflow-hidden">
        <div className="container mb-[60px] flex items-end justify-between">
          <SectionHeader label="Portfolio" heading="Category Creators" description="Our ecosystem handles private asset analysis at institutional scale." />
          <WQFButton label="Explore All" href="#" theme="dark" />
        </div>

        <div ref={portfolioScrollRef} className="flex gap-[40px] overflow-x-auto no-scrollbar snap-x scroll-px-[40px] px-[40px]" {...useCursor('drag')}>
          {portfolioCases.map((item, i) => (
             <div key={i} className="shrink-0 w-[80vw] md:w-[600px] snap-center">
                <div className="aspect-[16/10] bg-rich-carbon mb-[24px] overflow-hidden relative group" {...useCursor('view')}>
                   <div className="absolute inset-0 bg-infrared/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <CornerAccents color="rgba(255,255,255,0.05)" />
                   <div className="absolute bottom-[20px] left-[20px] p3-mono opacity-0 group-hover:opacity-100 transition-opacity">0{i+1} / 0{portfolioCases.length}</div>
                </div>
                <div className="flex justify-between items-end border-b border-white/[0.1] pb-[16px]">
                  <div>
                    <h3 className="h3-card">{item.name}</h3>
                    <p className="p2-mono text-pulse-ash mt-[4px]">{item.tag}</p>
                  </div>
                  <a href="#" className="p3-mono no-underline text-neural-fog hover:text-white transition-colors">{item.site} →</a>
                </div>
             </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          LEADERSHIP TEAM (Component 07)
          ════════════════════════════════════════════ */}
      <section className="section-padding bg-core-black">
        <div className="container">
          <SectionHeader label="Our Leadership" heading="The Engineering Lead" description="Spotting trends before they become market consensus." />
          
          <div className="grid md:grid-cols-3 gap-[2px] bg-white/[0.05] mt-[80px]">
            {leadershipTeam.map((member, i) => (
              <div key={i} className="bg-core-black p-[40px] group transition-all duration-500 hover:bg-rich-carbon relative">
                <div className="aspect-[3/4] bg-rich-carbon mb-[32px] group-hover:scale-[0.98] transition-transform duration-500 overflow-hidden relative">
                   <CornerAccents color="rgba(255,255,255,0.03)" />
                </div>
                <h3 className="h3-card mb-[4px]">{member.name}</h3>
                <p className="p2-mono text-pulse-ash mb-[20px]">{member.role}</p>
                <div className="h-px w-0 bg-infrared group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          INVESTOR SECTION (Component 08)
          ════════════════════════════════════════════ */}
      <section className="section-padding bg-rich-carbon">
        <div className="container">
          <SectionHeader label="For Investors" heading="Invest in Tomorrow" description="Partner with category creators at the edge of what's possible." />
          
          <div className="grid md:grid-cols-3 gap-[2px] bg-white/[0.05] mt-[80px]">
            {investorCards.map((card, i) => (
              <div key={i} className="bg-rich-carbon p-[40px] flex flex-col gap-[32px] group">
                <span className="p3-mono text-pulse-ash">{card.num}</span>
                <div>
                  <h3 className="h3-card mb-[16px]">{card.title}</h3>
                  <p className="p2-mono text-pulse-ash lowercase leading-relaxed group-hover:text-neural-fog transition-colors">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOUNDERS & PARTNERS CTA (Component 09/10)
          ════════════════════════════════════════════ */}
      <section id="founders" className="section-padding bg-core-black">
        <div className="container text-center flex flex-col items-center gap-[40px]">
          <span className="p3-mono text-pulse-ash">Founders</span>
          <h2 className="h2-section max-w-[800px]">Build fast, with zero friction and total focus.</h2>
          <p className="p-body text-pulse-ash max-w-[600px]">We provide the technical bedrock for the next generation of collectible exchanges. Stop building infrastructure, start building your product.</p>
          <WQFButton label="Build with us" onClick={() => setContactOpen(true)} theme="dark" />
        </div>
      </section>

      <section className="section-padding bg-rich-carbon">
        <div className="container text-center flex flex-col items-center gap-[40px]">
          <span className="p3-mono text-pulse-ash">Partners</span>
          <h2 className="h2-section max-w-[800px]">Partner at the edge of what's possible.</h2>
          <p className="p-body text-pulse-ash max-w-[600px]">Join our ecosystem of institutional providers, data partners, and liquidity engines.</p>
          <WQFButton label="Partner with us" onClick={() => setContactOpen(true)} theme="dark" />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FINAL CTA (Component 11)
          ════════════════════════════════════════════ */}
      <section className="section-padding bg-core-black relative overflow-hidden">
        <div className="absolute inset-0 bg-infrared/5 pointer-events-none" />
        <div className="container text-center flex flex-col items-center gap-[60px] relative z-10">
          <h2 className="h1-hero">Own what's next.</h2>
          <div className="flex flex-col gap-[20px] max-w-[700px]">
             <p className="p-body text-off-white">Breakthrough founders. Pre-market investors. Transformative partners.</p>
             <p className="p-body text-pulse-ash">Reach out, and let's move.</p>
          </div>
          <WQFButton label="Contact Us" onClick={() => setContactOpen(true)} theme="dark" />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER (Component 12)
          ════════════════════════════════════════════ */}
      <footer className="section-padding bg-core-black border-t border-white/[0.05]">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start gap-[80px]">
            <div className="flex flex-col gap-[40px]">
              <span className="font-display font-medium text-[2rem] tracking-[0.2em] text-infrared select-none">TROVEX</span>
              <nav className="flex flex-wrap gap-x-[40px] gap-y-[20px]">
                {['Why WQF', 'Portfolio', 'Team', 'Insights', 'Contact'].map(l => (
                   <a key={l} href="#" onClick={l === 'Contact' ? (e) => { e.preventDefault(); setContactOpen(true) } : undefined} className="p2-mono no-underline text-pulse-ash hover:text-white transition-colors">{l}</a>
                ))}
              </nav>
            </div>
            
            <div className="flex flex-col gap-[20px] text-left md:text-right">
              <p className="p3-mono text-pulse-ash">From WorldQuant: Ventures | University</p>
              <nav className="flex flex-wrap gap-x-[20px] gap-y-[10px] md:justify-end">
                {['Whistleblower', 'Privacy', 'Terms', 'Cookie'].map(l => (
                   <a key={l} href="#" className="p3-mono no-underline text-pulse-ash hover:text-white transition-colors">{l}</a>
                ))}
              </nav>
              <div className="mt-[40px]">
                <p className="p3-mono text-pulse-ash">Site by Series Eight Variant</p>
                <p className="p3-mono text-pulse-ash">© {new Date().getFullYear()} WorldQuant Foundry (Trovex Infrastructure)</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
