import { useState, useEffect, type ReactNode, type FormEvent } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { Home, Cable, Building2, RadioTower, Compass, HeartHandshake, Layers, Info, Headset, MousePointerClick,
  Menu, X, Phone, ChevronDown, ArrowRight, Check } from 'lucide-react'
import { submitInquiry } from './lib/submitInquiry'

// Number is assembled at click time so it is not printed in the page markup.
const digits = () => ['929', '631', '4100']
const telHref = () => 'tel:+1' + digits().join('')
const phoneDisplay = () => { const [a, b, c] = digits(); return `+1 (${a}) ${b}-${c}` }
const links = [['Home', '#home'], ['Residential Internet', '#services'], ['Business Solutions', '#services'], ['Why MyTelBridge', '#why'], ['FAQs', '#faq'], ['Contact', '#contact']]

const Reveal = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay, ease: 'easeOut' }}>{children}</motion.div>
)

const Logo = () => (
  <a href="#home" className="flex items-center gap-2.5 font-display text-xl font-bold text-white" aria-label="MyTelBridge home">
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#2F7BFF" /><stop offset="1" stopColor="#22D3EE" /></linearGradient></defs>
      <rect width="34" height="34" rx="9" fill="url(#lg)" />
      <path d="M6 24c0-9 4.5-14 11-14s11 5 11 14" stroke="#050B1A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="17" cy="24" r="2.6" fill="#050B1A" />
    </svg>
    <span>My<span className="grad-text">TelBridge</span></span>
  </a>
)

function CallButton({ className, label = 'Call Our Team' }: { className: string; label?: string }) {
  const [shown, setShown] = useState(false)
  const onClick = () => {
    setShown(true)
    // On phones, start the call right away; on desktop, reveal the number.
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) window.location.href = telHref()
  }
  if (shown) return <a href={telHref()} className={className}><Phone size={16} />{phoneDisplay()}</a>
  return <button type="button" onClick={onClick} className={className}><Phone size={16} />{label}</button>
}

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24)
    f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${scrolled || open ? 'bg-navy-950/85 backdrop-blur-lg border-b border-white/10' : ''}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Main">
        <Logo />
        <ul className="hidden items-center gap-7 text-sm lg:flex">
          {links.map(([l, h]) => <li key={l}><a href={h} className="text-slate-300 transition hover:text-white">{l}</a></li>)}
        </ul>
        <a href="#contact" className="btn-primary hidden !py-2.5 lg:inline-flex">Get Started</a>
        <button className="rounded-lg p-2 text-white lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden lg:hidden">
            <ul className="flex flex-col gap-1 px-5 pb-6">
              {links.map(([l, h], i) => (
                <motion.li key={l} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <a href={h} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-lg text-white hover:bg-white/5">{l}</a>
                </motion.li>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-3">Get Started</a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function NetworkVisual() {
  const nodes: [number, number][] = [[60, 120], [180, 60], [300, 150], [420, 70], [150, 250], [290, 300], [440, 230], [250, 190]]
  const edges = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 7], [7, 2], [7, 5], [5, 6], [6, 3], [1, 7]]
  return (
    <div className="relative mx-auto aspect-[500/380] w-full max-w-[540px]">
      <div className="absolute inset-6 rounded-full bg-brand/25 blur-3xl" aria-hidden="true" />
      <div className="glass relative h-full w-full overflow-hidden rounded-3xl">
        <svg viewBox="0 0 500 380" className="h-full w-full" role="img" aria-label="Animated network of connected points">
          <defs><linearGradient id="ln" x1="0" x2="1"><stop stopColor="#2F7BFF" /><stop offset="1" stopColor="#22D3EE" /></linearGradient></defs>
          {edges.map(([a, b], i) => (
            <g key={i}>
              <line x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#2F7BFF" strokeOpacity=".25" />
              <motion.line x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="url(#ln)" strokeWidth="2" strokeLinecap="round"
                strokeDasharray="14 120" animate={{ strokeDashoffset: [134, 0] }} transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: 'linear', delay: i * 0.3 }} />
            </g>
          ))}
          {nodes.map(([x, y], i) => (
            <motion.g key={i} animate={{ y: [0, i % 2 ? -5 : 5, 0] }} transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}>
              <circle cx={x} cy={y} r="14" fill="#22D3EE" fillOpacity=".12" />
              <circle cx={x} cy={y} r={i === 7 ? 8 : 5} fill={i === 7 ? '#22D3EE' : '#fff'} />
            </motion.g>
          ))}
        </svg>
        <div className="glass absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-white">
          <span className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-cyan2" />Connected homes &amp; businesses</span>
          <span className="text-slate-400">Illustration</span>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div className="absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-brand/20 blur-[120px]" animate={{ x: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0 opacity-[.07]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '56px 56px', maskImage: 'radial-gradient(ellipse at 30% 30%,#000,transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at 30% 30%,#000,transparent 70%)' }} />
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-cyan2">
            <RadioTower size={14} /> Internet &amp; Connectivity
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Your <span className="grad-text">Connection.</span> Your <span className="grad-text">World.</span> Our Commitment.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Discover smarter internet and connectivity solutions designed to keep homes and businesses across America connected.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#services" className="btn-primary">Explore Our Services <ArrowRight size={16} /></a>
            <a href="#contact" className="btn-ghost">Talk to Our Team</a>
          </motion.div>
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            {['Clear guidance', 'Homes & businesses', 'Dedicated assistance'].map((t) => <li key={t} className="flex items-center gap-2"><Check size={16} className="text-cyan2" />{t}</li>)}
          </motion.ul>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.8 }}><NetworkVisual /></motion.div>
      </div>
    </section>
  )
}

const Heading = ({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) => (
  <Reveal className="mx-auto mb-14 max-w-2xl text-center">
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan2">{eyebrow}</p>
    <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
    {sub && <p className="mt-4 text-slate-400">{sub}</p>}
  </Reveal>
)

const services = [
  { icon: Home, title: 'Residential Internet', pts: ['Explore home internet connectivity options', 'Reliable connectivity for everyday needs', 'Solutions for different household requirements'] },
  { icon: Cable, title: 'Fiber Internet', pts: ['Modern fiber-optic connectivity', 'High-speed internet options', 'Availability and eligibility guidance'] },
  { icon: Building2, title: 'Business Internet', pts: ['Connectivity solutions for businesses', 'Reliable internet for teams and operations', 'Solutions based on business requirements'] },
  { icon: RadioTower, title: 'Wireless Solutions', pts: ['Wireless connectivity options', 'Explore eligible plans and offers', 'Support for individual and business needs'] },
]

function Services() {
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Heading eyebrow="Services" title="Connectivity Solutions Built Around You" sub="Explore the ways we can help your home or business stay connected." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: I, title, pts }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <motion.article whileHover={{ y: -8 }} className="group glass relative h-full overflow-hidden rounded-3xl p-7 transition-colors duration-300 hover:border-cyan2/50">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/0 blur-2xl transition duration-500 group-hover:bg-cyan2/30" aria-hidden="true" />
                <div className="relative mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand to-cyan2 text-navy-950"><I size={24} /></div>
                <h3 className="relative font-display text-xl font-semibold text-white">{title}</h3>
                <ul className="relative mt-4 space-y-2.5 text-sm text-slate-400">
                  {pts.map((p) => <li key={p} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-cyan2" />{p}</li>)}
                </ul>
                <a href="#contact" className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-cyan2">Ask about this <ArrowRight size={14} className="transition group-hover:translate-x-1" /></a>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const why = [
  { icon: Compass, t: 'Personalized Connectivity Guidance', d: 'We start with what you need, then help you review options that fit your home or business.', big: true },
  { icon: HeartHandshake, t: 'Customer-First Approach', d: 'Your requirements lead the conversation, every time.' },
  { icon: Layers, t: 'Solutions for Homes and Businesses', d: 'One team for household and business connectivity needs.' },
  { icon: Info, t: 'Clear Information and Guidance', d: 'Straightforward explanations, so you know what to expect from each step.' },
  { icon: Headset, t: 'Dedicated Customer Assistance', d: 'Real people ready to answer your questions.', big: true },
  { icon: MousePointerClick, t: 'Simple and Convenient Experience', d: 'Reach out once and we guide you through what comes next.' },
]

function Why() {
  return (
    <section id="why" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Heading eyebrow="Why MyTelBridge" title="Connectivity, Made Clear and Personal" />
        <div className="grid gap-5 md:grid-cols-3">
          {why.map(({ icon: I, t, d, big }, i) => (
            <Reveal key={t} delay={i * 0.06} className={big ? 'md:col-span-2' : ''}>
              <div className={`glass h-full rounded-3xl p-8 ${big ? 'bg-gradient-to-br from-brand/15 to-transparent' : ''}`}>
                <I className="mb-5 text-cyan2" size={30} />
                <h3 className="font-display text-xl font-semibold text-white">{t}</h3>
                <p className="mt-2 max-w-md text-slate-400">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  ['01', 'Tell Us What You Need', 'Customers share their connectivity requirements.'],
  ['02', 'Explore Available Options', 'Our team helps review suitable solutions and available options.'],
  ['03', 'Get Connected', 'Customers receive guidance through the next steps.'],
]

function How() {
  return (
    <section id="how" className="py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Heading eyebrow="How It Works" title="Three Simple Steps" />
        <div className="relative grid gap-10 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-8 hidden h-px bg-gradient-to-r from-transparent via-cyan2/50 to-transparent md:block" aria-hidden="true" />
          {steps.map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 0.12} className="relative text-center">
              <div className="glass relative mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full font-display text-xl font-bold grad-text shadow-[0_0_40px_-8px_#22D3EE]">{n}</div>
              <h3 className="font-display text-xl font-semibold text-white">{t}</h3>
              <p className="mx-auto mt-2 max-w-xs text-slate-400">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="px-5 py-12 lg:px-8">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand via-[#1747b8] to-navy-900 px-6 py-16 text-center sm:px-12 lg:py-20">
          <motion.div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan2/40 blur-3xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity }} aria-hidden="true" />
          <h2 className="relative font-display text-3xl font-bold text-white sm:text-5xl">Ready to Experience a Better Connection?</h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-blue-100">Let&rsquo;s find the connectivity solution that works for you. Connect with our team and explore your options.</p>
          <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#contact" className="btn bg-white text-navy-950 hover:-translate-y-0.5 hover:shadow-xl">Get Started</a>
            <CallButton className="btn border border-white/40 text-white hover:bg-white/10" />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

const faqs = [
  ['What services does MyTelBridge offer?', 'MyTelBridge helps customers explore residential internet, fiber internet, business internet, and wireless connectivity solutions.'],
  ['How can I find internet options in my area?', 'Share your ZIP code and requirements through the contact form or call our team. We will help you review the options that may be available to you.'],
  ['Do you offer residential and business solutions?', 'Yes. We assist both households and businesses, with guidance based on your specific requirements.'],
  ['How can I speak with your team?', 'Use the Call Us button on this page or send an inquiry through the contact form.'],
  ['Are internet plans and pricing the same everywhere?', 'No. Available services, plans, and pricing can vary by location and eligibility. Our team can help you understand what applies to you.'],
  ['How do I get started?', 'Tell us what you need using the contact form or by phone, and we will guide you through the next steps.'],
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Heading eyebrow="FAQs" title="Frequently Asked Questions" />
        <div className="space-y-3">
          {faqs.map(([q, a], i) => (
            <Reveal key={q} delay={i * 0.04}>
              <div className="glass rounded-2xl">
                <h3>
                  <button className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium text-white" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                    {q}<motion.span animate={{ rotate: open === i ? 180 : 0 }}><ChevronDown size={20} className="text-cyan2" /></motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-slate-400">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const empty = { name: '', email: '', phone: '', zip: '', service: '', message: '', consent: false }

function Contact() {
  const [f, setF] = useState(empty)
  const [err, setErr] = useState<Record<string, string>>({})
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const set = (k: string, v: string | boolean) => setF((p) => ({ ...p, [k]: v }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (f.name.trim().length < 2) e.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Please enter a valid email address.'
    if (f.phone.replace(/\D/g, '').length < 10) e.phone = 'Please enter a 10-digit phone number.'
    if (!/^\d{5}(-\d{4})?$/.test(f.zip)) e.zip = 'Please enter a valid US ZIP code.'
    if (!f.service) e.service = 'Please select a service.'
    if (!f.consent) e.consent = 'Consent is required so we can contact you.'
    return e
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate(); setErr(e)
    if (Object.keys(e).length) return
    setState('sending')
    await submitInquiry(f)
    setState('done')
  }

  const Err = ({ k }: { k: string }) => err[k] ? <p role="alert" className="mt-1 text-xs text-rose-400">{err[k]}</p> : null

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-5 lg:px-8">
        <Reveal className="lg:col-span-2">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan2">Contact</p>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Talk to the MyTelBridge Team</h2>
          <p className="mt-4 text-slate-400">Tell us what you need and we will help you explore your options.</p>
          <div className="glass mt-8 rounded-2xl p-6">
            <p className="font-display text-lg font-semibold text-white">MyTelBridge</p>
            <CallButton label="Call Us" className="btn-primary mt-3" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-3">
          <div className="glass rounded-3xl p-6 sm:p-8">
            {state === 'done' ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center" role="status">
                <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brand to-cyan2 text-navy-950"><Check size={32} /></div>
                <h3 className="font-display text-2xl font-semibold text-white">Thank you, {f.name.split(' ')[0]}.</h3>
                <p className="mx-auto mt-3 max-w-md text-slate-400">Your inquiry was validated successfully. <strong className="text-slate-200">This is a demo website, so no message has been sent.</strong> In the live version, our team will follow up.</p>
                <button className="btn-ghost mt-6" onClick={() => { setF(empty); setState('idle') }}>Send another inquiry</button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                <div><label htmlFor="name" className="mb-1.5 block text-sm text-white">Full Name</label><input id="name" className="field" autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} /><Err k="name" /></div>
                <div><label htmlFor="email" className="mb-1.5 block text-sm text-white">Email Address</label><input id="email" type="email" className="field" autoComplete="email" value={f.email} onChange={(e) => set('email', e.target.value)} /><Err k="email" /></div>
                <div><label htmlFor="phone" className="mb-1.5 block text-sm text-white">Phone Number</label><input id="phone" type="tel" className="field" autoComplete="tel" value={f.phone} onChange={(e) => set('phone', e.target.value)} /><Err k="phone" /></div>
                <div><label htmlFor="zip" className="mb-1.5 block text-sm text-white">ZIP Code</label><input id="zip" inputMode="numeric" className="field" autoComplete="postal-code" value={f.zip} onChange={(e) => set('zip', e.target.value)} /><Err k="zip" /></div>
                <div className="sm:col-span-2"><label htmlFor="service" className="mb-1.5 block text-sm text-white">Service Interested In</label>
                  <select id="service" className="field" value={f.service} onChange={(e) => set('service', e.target.value)}>
                    <option value="">Select a service</option>
                    {['Residential Internet', 'Fiber Internet', 'Business Internet', 'Wireless Solutions', 'Not sure yet'].map((s) => <option key={s}>{s}</option>)}
                  </select><Err k="service" /></div>
                <div className="sm:col-span-2"><label htmlFor="message" className="mb-1.5 block text-sm text-white">Message <span className="text-slate-500">(optional)</span></label><textarea id="message" rows={4} className="field" value={f.message} onChange={(e) => set('message', e.target.value)} /></div>
                <div className="sm:col-span-2">
                  <label className="flex gap-3 text-sm text-slate-400"><input type="checkbox" className="mt-1 h-4 w-4 accent-cyan-400" checked={f.consent} onChange={(e) => set('consent', e.target.checked)} />
                    I agree to be contacted by MyTelBridge by phone, email, or text about my inquiry. Message and data rates may apply.</label><Err k="consent" /></div>
                <button type="submit" disabled={state === 'sending'} className="btn-primary sm:col-span-2 disabled:opacity-60">{state === 'sending' ? 'Sending…' : 'Submit Inquiry'}</button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Legal({ kind, onClose }: { kind: 'Privacy Policy' | 'Terms & Conditions'; onClose: () => void }) {
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [onClose])
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-5" onClick={onClose} role="dialog" aria-modal="true" aria-label={kind}>
      <div className="glass max-h-[80vh] w-full max-w-lg overflow-auto rounded-3xl bg-navy-900 p-8" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-display text-2xl font-bold text-white">{kind}</h2>
        <p className="mt-2 inline-block rounded-full bg-amber-400/15 px-3 py-1 text-xs font-medium text-amber-300">Demo placeholder</p>
        <p className="mt-4 text-slate-400">This is placeholder content for the MyTelBridge demo website. The final {kind.toLowerCase()} will be prepared and reviewed before launch. It does not describe any actual data practices or legal terms.</p>
        <button className="btn-primary mt-6" onClick={onClose}>Close</button>
      </div>
    </motion.div>
  )
}

function Footer({ onLegal }: { onLegal: (k: 'Privacy Policy' | 'Terms & Conditions') => void }) {
  const col = 'space-y-2.5 text-sm'
  return (
    <footer className="mt-12 border-t border-white/10 bg-navy-900/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div><Logo /><p className="mt-4 max-w-xs text-sm text-slate-400">Internet and connectivity guidance for homes and businesses across America.</p></div>
        <nav aria-label="Quick links"><h4 className="mb-4 font-semibold text-white">Quick Links</h4><ul className={col}>{[['Home', '#home'], ['Why MyTelBridge', '#why'], ['How It Works', '#how'], ['FAQs', '#faq'], ['Contact', '#contact']].map(([l, h]) => <li key={l}><a className="hover:text-white" href={h}>{l}</a></li>)}</ul></nav>
        <nav aria-label="Services"><h4 className="mb-4 font-semibold text-white">Services</h4><ul className={col}>{services.map((s) => <li key={s.title}><a className="hover:text-white" href="#services">{s.title}</a></li>)}</ul></nav>
        <div><h4 className="mb-4 font-semibold text-white">Contact</h4><CallButton label="Call Us" className="btn-ghost !py-2" />
          <ul className={`${col} mt-4`}><li><button className="hover:text-white" onClick={() => onLegal('Privacy Policy')}>Privacy Policy</button></li><li><button className="hover:text-white" onClick={() => onLegal('Terms & Conditions')}>Terms &amp; Conditions</button></li></ul></div>
      </div>
      <p className="border-t border-white/10 py-6 text-center text-xs text-slate-500">&copy; 2026 MyTelBridge. All rights reserved. Demo website.</p>
    </footer>
  )
}

export default function App() {
  const [legal, setLegal] = useState<null | 'Privacy Policy' | 'Terms & Conditions'>(null)
  return (
    <MotionConfig reducedMotion="user">
      <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-navy-950">Skip to content</a>
      <Nav />
      <main><Hero /><Services /><Why /><How /><CTA /><FAQ /><Contact /></main>
      <Footer onLegal={setLegal} />
      <AnimatePresence>{legal && <Legal kind={legal} onClose={() => setLegal(null)} />}</AnimatePresence>
    </MotionConfig>
  )
}
