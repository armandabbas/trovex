import { Link } from 'react-router-dom'
import { useEffect, useRef, useState, useLayoutEffect, type CSSProperties } from 'react'
import Antigravity from '../components/Antigravity'
import { gsap } from 'gsap'

/* ─── Global State for Cursors ─── */
let setCursorTypeGlobal: (type: 'default' | 'drag' | 'view') => void = () => { }

/* ─── Trovex Logo Component (WQF Translation Pattern) ─── */
function TrovexLogo({ scrolled }: { scrolled: boolean }) {
  return (
    <Link to="/" className={`relative h-[30px] shrink-0 overflow-hidden transition-[width] duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'w-[30px]' : 'w-[120px]'}`} aria-label="Trovex">
      <div className={`flex flex-col transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? '-translate-y-[30px]' : 'translate-y-0'}`}>
        {/* State 1: 2-Line Text */}
        <div className={`h-[30px] flex flex-col justify-center items-start w-fit transition-opacity duration-300 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
          <span className="text-[1.25rem] font-[var(--font-logo)] font-bold uppercase tracking-tight text-white leading-none">Trovex</span>
          <div className="w-full flex justify-between text-[0.45rem] font-[var(--font-logo)] font-normal uppercase text-neural-fog leading-none mt-[2px] tracking-normal">
            {'COLLECTIBLES'.split('').map((char, i) => (
              <span key={i} className="leading-none">{char}</span>
            ))}
          </div>
        </div>
        {/* State 2: Icon */}
        <div className="h-[30px] flex items-center">
          <svg width="22" height="19" viewBox="0 0 350 310" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <g fill="currentColor">
              <path d="M 162 70 L 220 70 L 220 70 L 220 268 A 32 32 0 0 1 188 300 L 162 300 A 32 32 0 0 1 130 268 L 130 102 A 32 32 0 0 1 162 70 Z" />
              <path d="M 252 10 L 308 10 A 32 32 0 0 1 340 42 L 340 68 A 32 32 0 0 1 308 100 L 220 100 L 220 100 L 220 42 A 32 32 0 0 1 252 10 Z" />
              <path d="M 42 10 L 88 10 A 32 32 0 0 1 120 42 L 120 68 A 32 32 0 0 1 88 100 L 42 100 A 32 32 0 0 1 10 68 L 10 42 A 32 32 0 0 1 42 10 Z" />
              <path d="M 0 0 C 0 -23.872 5.76 -32 32 -32 H 0 Z" transform="translate(220, 132)" />
              <path d="M 0 0 C 0 23.872 -5.76 32 -32 32 H 0 Z" transform="translate(220, 38)" />
            </g>
          </svg>
        </div>
      </div>
    </Link>
  )
}

/* ─── Header Navigation Links ─── */
// (Skipping to the header section for link update)

// In the header component:
// <div className="p3-mono relative isolate flex ...">

/* ─── Corner Accents (WQF SVG Pattern) ─── */
function CornerAccents({ color = 'currentColor', size = 30 }: { color?: string; size?: number }) {
  return (
    <>
      <svg className="absolute -top-px -left-px" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d={`M${size} 1H1V${size}`} stroke="currentColor" />
      </svg>
      <svg className="absolute -top-px -right-px rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d={`M${size} 1H1V${size}`} stroke="currentColor" />
      </svg>
      <svg className="absolute -bottom-px -left-px -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d={`M${size} 1H1V${size}`} stroke="currentColor" />
      </svg>
      <svg className="absolute -bottom-px -right-px rotate-180" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
        <path d={`M${size} 1H1V${size}`} stroke="currentColor" />
      </svg>
    </>
  )
}


/* ─── WQF Button ─── */
function WQFButton({ label, href, theme = 'dark', onClick }: { label: string; href?: string; theme?: 'dark' | 'light'; onClick?: () => void }) {
  const textColor = theme === 'light' ? 'var(--color-rich-carbon)' : 'var(--color-off-white)'
  const accentColor = theme === 'light' ? 'rgba(17,17,17,0.4)' : 'rgba(231,231,231,0.4)'

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
        <CornerAccents color={accentColor} size={14} />
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
  const idleTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    setCursorTypeGlobal = setType
  }, [])

  useEffect(() => {
    const returnToCenter = () => {
      setCursorPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    }

    // Initialize to center
    returnToCenter()

    const onMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })

      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
      idleTimeoutRef.current = setTimeout(returnToCenter, 2000)
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
    }
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


function getCursorHandlers(type: 'drag' | 'view') {
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
  const portfolioScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current
      setHeaderState(prev => ({
        ...prev,
        scrolled: currentY > 400,
        hidden: currentY > 800 && delta > 100,
      }))
      if (Math.abs(delta) > 100) lastScrollY.current = currentY
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
      const tl = gsap.timeline({ delay: 0.4 })

      // Phase 1: Institutional Word-Level Bloom
      const leftGroup = ['#hero-w-turning', '#hero-w-collection', '#hero-w-liquid']
      const rightGroup = ['#hero-w-every', '#hero-w-into', '#hero-w-value']

      // Reset everything to hidden/centered initially (Phase 0)
      gsap.set([...leftGroup, ...rightGroup], { left: "50%", y: 0, opacity: 0, scale: 0.8, filter: "blur(15px)" })
      gsap.set(['#main-header', '#hero-footer', '#ethos'], { autoAlpha: 0, y: 0 })

      // Phase 1: Precision Word-Level Bloom (Centered State)
      tl.to('#hero-w-turning', { xPercent: -85, x: "-0.2em", scale: 1, filter: "blur(0px)", opacity: 1, duration: 1.2, ease: 'power2.out' }, "+=0.1")
      tl.to('#hero-w-every', { xPercent: 15, x: "0.2em", scale: 1, filter: "blur(0px)", opacity: 1, duration: 1.2, ease: 'power2.out' }, "<")
      tl.to('#hero-w-collection', { xPercent: -70, x: "-0.2em", scale: 1, filter: "blur(0px)", opacity: 1, duration: 1.2, ease: 'power2.out' }, "<")
      tl.to('#hero-w-into', { xPercent: 75, x: "0.2em", scale: 1, filter: "blur(0px)", opacity: 1, duration: 1.2, ease: 'power2.out' }, "<")
      tl.to('#hero-w-liquid', { xPercent: -95, x: "-0.2em", scale: 1, filter: "blur(0px)", opacity: 1, duration: 1.2, ease: 'power2.out' }, "<")
      tl.to('#hero-w-value', { xPercent: -5, x: "0.2em", scale: 1, filter: "blur(0px)", opacity: 1, duration: 1.2, ease: 'power2.out' }, "<")

      // Phase 3: Synchronized Reveal (Split + UI + Lower Page)
      // Use a label to synchronize all global UI reveals (Zero delay for fluid transition)
      tl.addLabel("reveal", "+=0.0")

      // 1. Desktop-Only: Move Words to Corners
      if (window.innerWidth > 1024) {
        const glideDuration = 3.5
        const glideEase = 'expo.inOut'

        tl.to('#hero-w-turning', { left: "24vw", y: "-26vh", duration: glideDuration, ease: glideEase }, "reveal")
        tl.to('#hero-w-every', { left: "24.5vw", y: "-26vh", duration: glideDuration, ease: glideEase }, "reveal")
        tl.to('#hero-w-collection', { left: "28vw", y: "-26vh", duration: glideDuration, ease: glideEase }, "reveal")
        tl.to('#hero-w-into', { left: "73vw", y: "15vh", duration: glideDuration, ease: glideEase }, "reveal")
        tl.to('#hero-w-liquid', { left: "78vw", y: "15vh", duration: glideDuration, ease: glideEase }, "reveal")
        tl.to('#hero-w-value', { left: "78vw", y: "15vh", duration: glideDuration, ease: glideEase }, "reveal")
      }

      // 2. Global: The Integrated 'Light Up' (Always runs on all devices, fully synchronized v29)
      const uiDuration = 3.5
      const uiEase = 'expo.inOut'

      tl.to('#main-header', { autoAlpha: 1, y: 0, pointerEvents: "auto", duration: uiDuration, ease: uiEase }, "reveal")
      tl.to('#hero-footer', { autoAlpha: 1, y: 0, duration: uiDuration, ease: uiEase }, "reveal")
      tl.to('#ethos', { autoAlpha: 1, y: 0, duration: uiDuration, ease: uiEase }, "reveal")
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="bg-core-black text-white font-display antialiased leading-relaxed">
      <WQFCursors />

      {/* ════════════════════════════════════════════
          CONTACT MODAL (Component 13)
          ════════════════════════════════════════════ */}
      <div className={`fixed inset-0 z-[2000] flex bg-rich-carbon/40 backdrop-blur-[10px] transition-opacity duration-400 ${contactOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`bg-neural-fog text-rich-carbon relative isolate h-full w-full max-w-[700px] overflow-y-auto px-[16px] pt-[32px] md:rounded-r-[20px] md:p-[40px] transition-transform duration-400 ease-[var(--easing)] ${contactOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <button className="text-rich-carbon/60 hover:text-rich-carbon absolute top-[24px] right-[24px] transition-colors" onClick={() => setContactOpen(false)}>
            <svg className="size-[16px]" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 14.8696C0 14.1844 0.555 13.6289 1.241 13.6289L2.302 13.6289C2.988 13.6289 3.543 13.0734 3.543 12.3882V11.5024C3.543 10.8172 4.098 10.2617 4.784 10.2617L5.228 10.2617C5.913 10.2617 6.469 9.706 6.469 9.021V7.957C6.469 7.272 7.024 6.717 7.709 6.717H8.187C8.872 6.717 9.428 6.161 9.428 5.476V4.713C9.428 4.028 9.983 3.473 10.668 3.473H11.484C12.169 3.473 12.725 2.917 12.725 2.232V1.241C12.725 0.555 13.28 0 13.965 0H15.029C15.714 0 16.27 0.555 16.27 1.241V2.304C16.27 2.989 15.714 3.545 15.029 3.545H14.213C13.528 3.545 12.973 4.1 12.973 4.786V5.777C12.973 6.462 12.417 7.018 11.732 7.018H11.254C10.569 7.018 10.014 7.573 10.014 8.258V9.021C10.014 9.706 9.458 10.262 8.773 10.262H8.329C7.643 10.262 7.088 11.502V12.566C7.088 13.251 6.532 13.807 5.847 13.807H4.786C4.1 13.807 3.545 14.362 3.545 15.047V15.933C3.545 16.618 2.99 17.174 2.304 17.174H1.241C0.555 17.174 0 16.618 0 15.933V14.869z" fill="currentColor" />
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

              <WQFButton label="Send message" onClick={() => { }} theme="light" />
            </form>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════
          Trovex Island Header (Component 01 Refined)
          ════════════════════════════════════════════ */}
      <header id="main-header" className={`fixed top-0 left-0 z-50 w-full flex justify-center transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${headerState.hidden ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className={`flex items-center transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] relative
          ${headerState.scrolled
            ? 'mt-4 h-[48px] rounded-[8px] px-[12px] py-[4px] bg-white/10 backdrop-blur-[25px] w-fit shadow-2xl grow-0'
            : 'w-full h-[var(--header-height)] px-[24px] md:px-[40px] bg-transparent grow'
          }`}>

          <div className="flex items-center w-full relative">
            <TrovexLogo scrolled={headerState.scrolled} />

            <nav className={`hidden lg:flex items-center transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${headerState.scrolled ? 'ml-[12px] gap-[12px]' : 'ml-auto gap-[20px]'}`}>
              {['Why Trovex', 'Portfolio', 'Insights', 'Contact'].map(item => (
                <a key={item}
                  href={item === 'Contact' ? '#' : `#${item.toLowerCase()}`}
                  onClick={item === 'Contact' ? (e) => { e.preventDefault(); setContactOpen(true) } : undefined}
                  className="group/link block relative isolate motion-safe:hover:animate-glitch-hover h-[40px]">
                  <div className={`flex h-full items-center transition-all duration-400 ${headerState.scrolled ? 'px-0' : 'px-[12px]'}`}>
                    <div className="bg-neural-fog size-[10px] -translate-x-[24px] rounded-[3px] opacity-0 blur-[20px] transition-all duration-400 ease-[var(--easing)] group-hover/link:-translate-x-[5px] group-hover/link:opacity-100 group-hover/link:blur-[0px]" />
                    <div className="text-[0.69rem] font-[var(--font-mono)] font-medium relative isolate flex overflow-hidden transition-transform duration-400 ease-[var(--easing)] -translate-x-[5px] group-hover/link:translate-x-[5px]">
                      <span className="transition-transform duration-400 ease-[var(--easing)] group-hover/link:-translate-y-full uppercase">{item}</span>
                      <span className="absolute inset-0 translate-y-full transition-transform duration-400 ease-[var(--easing)] group-hover/link:translate-y-0 uppercase" aria-hidden="true">{item}</span>
                    </div>
                  </div>
                </a>
              ))}
            </nav>

            {!headerState.scrolled && (
              <button className="lg:hidden text-[0.69rem] font-[var(--font-mono)] font-medium ml-auto" onClick={() => setHeaderState(p => ({ ...p, mobileOpen: !p.mobileOpen }))}>MENU</button>
            )}
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════
          WQF HERO (Component 02)
          ════════════════════════════════════════════ */}
      <section id="hero-trigger" className="relative h-dvh w-full overflow-hidden" style={{ background: 'var(--color-core-black)' }}>
        <div className="absolute inset-0 z-0 opacity-80">
          <Antigravity
            count={5000}
            magnetRadius={1}
            ringRadius={2}
            waveSpeed={0.04}
            waveAmplitude={0.3}
            particleSize={0.1}
            lerpSpeed={0.008}
            color="hsla(256, 100%, 94%, 0.11)"
            autoAnimate={true}
            particleVariance={1}
            rotationSpeed={1.0}
            depthFactor={10}
            pulseSpeed={0.01}
            particleShape="sphere"
            fieldStrength={20}
          />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-center py-0">
          {/* Absolute Anchor Refactor v15: Screenshot Match Final */}
          <h1 className="h1-hero relative w-full h-[60vh] flex items-center justify-center uppercase leading-[0.9] tracking-tighter">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Every word is anchored to left-1/2 for synchronized alignment math */}
              <span id="hero-w-turning" className="hero-word-p1 absolute top-[calc(50%-1.1em)] left-1/2 translate-y-full opacity-0 pointer-events-none">TURNING</span>
              <span id="hero-w-every" className="hero-word-p1 absolute top-[calc(50%-1.1em)] left-1/2 translate-y-full opacity-0 pointer-events-none">EVERY</span>

              <span id="hero-w-collection" className="hero-word-p1 absolute top-[50%] left-1/2 translate-y-full opacity-0 pointer-events-none">COLLECTION</span>
              <span id="hero-w-into" className="hero-word-p2 absolute top-[50%] left-1/2 translate-y-full opacity-0 pointer-events-none">INTO</span>

              <span id="hero-w-liquid" className="hero-word-p2 absolute top-[calc(50%+1.1em)] left-1/2 translate-y-full opacity-0 pointer-events-none">LIQUID</span>
              <span id="hero-w-value" className="hero-word-p2 absolute top-[calc(50%+1.1em)] left-1/2 translate-y-full opacity-0 pointer-events-none">VALUE</span>
            </div>
          </h1>

          {/* Hero Footer Bar (Anchored to bottom) */}
          <div className="absolute bottom-0 left-0 w-full px-[24px] md:px-[40px] pb-[32px] opacity-0 invisible" id="hero-footer">
            <div className="w-full h-px bg-white/10 mb-[24px]" />
            <div className="flex flex-col md:flex-row justify-between items-end gap-[32px]">
              {/* Bottom Left: Contact Us */}
              <div className="w-full md:w-auto">
                <div className="flex items-center gap-[12px]">
                  <WQFButton label="Contact Us" onClick={() => setContactOpen(true)} theme="dark" />
                </div>
              </div>

              {/* Bottom Right: Description & Logo */}
              <div className="flex flex-col md:flex-row items-end gap-[24px] md:gap-[40px] max-w-[800px]">
                <div className="flex flex-col items-end">
                  <p className="p-hero-footer text-neural-fog text-right max-w-[440px]">
                    Trovex is the reimagined exchange protocol. Deploying institutional alpha to the collectible asset class at scale. We provide the technical bedrock for the next generation.
                  </p>
                </div>

                <div className="shrink-0 text-white opacity-40 hover:opacity-100 transition-opacity hidden md:block">
                  <svg width="60" height="53" viewBox="0 0 350 310" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g fill="currentColor">
                      <path d="M 162 70 L 220 70 L 220 70 L 220 268 A 32 32 0 0 1 188 300 L 162 300 A 32 32 0 0 1 130 268 L 130 102 A 32 32 0 0 1 162 70 Z" />
                      <path d="M 252 10 L 308 10 A 32 32 0 0 1 340 42 L 340 68 A 32 32 0 0 1 308 100 L 220 100 L 220 100 L 220 42 A 32 32 0 0 1 252 10 Z" />
                      <path d="M 42 10 L 88 10 A 32 32 0 0 1 120 42 L 120 68 A 32 32 0 0 1 88 100 L 42 100 A 32 32 0 0 1 10 68 L 10 42 A 32 32 0 0 1 42 10 Z" />
                      <path d="M 0 0 C 0 -23.872 5.76 -32 32 -32 H 0 Z" transform="translate(220, 132)" />
                      <path d="M 0 0 C 0 23.872 -5.76 32 -32 32 H 0 Z" transform="translate(220, 38)" />
                    </g>
                  </svg>
                </div>
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

        <div ref={portfolioScrollRef} className="flex gap-[40px] overflow-x-auto no-scrollbar snap-x scroll-px-[40px] px-[40px]" {...getCursorHandlers('drag')}>
          {portfolioCases.map((item, i) => (
            <div key={i} className="shrink-0 w-[80vw] md:w-[600px] snap-center">
              <div className="aspect-[16/10] bg-rich-carbon mb-[24px] overflow-hidden relative group" {...getCursorHandlers('view')}>
                <div className="absolute inset-0 bg-infrared/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CornerAccents color="rgba(255,255,255,0.05)" />
                <div className="absolute bottom-[20px] left-[20px] p3-mono opacity-0 group-hover:opacity-100 transition-opacity">0{i + 1} / 0{portfolioCases.length}</div>
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
                {['Why Trovex', 'Portfolio', 'Team', 'Insights', 'Contact'].map(l => (
                  <a key={l} href="#" onClick={l === 'Contact' ? (e) => { e.preventDefault(); setContactOpen(true) } : undefined} className="p2-mono no-underline text-pulse-ash hover:text-white transition-colors">{l}</a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-[20px] text-left md:text-right">
              <p className="p3-mono text-pulse-ash">Trovex: Assets | Infrastructure</p>
              <nav className="flex flex-wrap gap-x-[20px] gap-y-[10px] md:justify-end">
                {['Whistleblower', 'Privacy', 'Terms', 'Cookie'].map(l => (
                  <a key={l} href="#" className="p3-mono no-underline text-pulse-ash hover:text-white transition-colors">{l}</a>
                ))}
              </nav>
              <div className="mt-[40px]">
                <p className="p3-mono text-pulse-ash">Site by Series Eight Variant</p>
                <p className="p3-mono text-pulse-ash">© {new Date().getFullYear()} Trovex Infrastructure</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
