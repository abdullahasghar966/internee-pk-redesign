import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { nav } from '../data/content';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="container-x">
          <nav
            className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
              scrolled
                ? 'glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.45)]'
                : 'border border-transparent'
            }`}
            aria-label="Primary"
          >
            <a
              href="#home"
              className="group flex items-center gap-2.5"
              aria-label="Internee.pk home"
            >
              <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl">
                <span className="absolute inset-0 bg-gradient-to-br from-violet-glow to-cyan-glow" />
                <span className="relative font-display text-lg font-bold text-white">i.</span>
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                internee<span className="text-violet-glow">.pk</span>
              </span>
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-white/75 transition hover:text-white"
                  >
                    <span className="relative z-10">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-2 lg:flex">
              <a
                href="#contact"
                className="btn-ghost !px-5 !py-2 text-xs"
              >
                Sign in
              </a>
              <a href="#tracks" className="btn-primary !px-5 !py-2 text-xs">
                Apply now
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>
            </div>

            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/5 text-white transition hover:border-white/30 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu size={18} />
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setOpen(false)}
              aria-label="Close menu backdrop"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 h-full w-[88%] max-w-sm border-l border-white/10 bg-ink-900/95 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
                <span className="font-display text-lg font-semibold text-white">
                  internee<span className="text-violet-glow">.pk</span>
                </span>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/5 text-white"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
              <ul className="flex flex-col gap-1 px-3 py-6">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.4 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-4 text-base font-medium text-white/85 transition hover:bg-white/5"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight size={16} className="text-white/40" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 border-t border-white/10 p-5">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-ghost w-full"
                >
                  Sign in
                </a>
                <a
                  href="#tracks"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  Apply now
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
