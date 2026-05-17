import { Github, Linkedin, Twitter, Instagram, ArrowUpRight, Mail } from 'lucide-react';
import { footerLinks } from '../data/content';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative isolate mt-12 overflow-hidden border-t border-white/8 pb-10 pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-noise opacity-50" />
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="glass-strong relative overflow-hidden rounded-[2rem] p-8 sm:p-10"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-400/12 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="heading-section text-balance">
                Ready to <span className="text-gradient-violet">ship your future?</span>
              </h3>
              <p className="body-lg mt-4 max-w-md">
                Subscribe for cohort drops, mentor AMAs, and the occasional honest essay
                about building a career from Pakistan.
              </p>
            </div>

            <form
              className="flex w-full flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter"
            >
              <label htmlFor="newsletter" className="sr-only">
                Email
              </label>
              <div className="relative flex-1">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                />
                <input
                  id="newsletter"
                  name="newsletter"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@university.edu.pk"
                  className="w-full rounded-full border border-white/12 bg-white/4 px-11 py-3.5 text-sm text-white placeholder:text-white/35 focus:border-violet-glow focus:outline-none"
                />
              </div>
              <button type="submit" className="btn-primary">
                Subscribe <ArrowUpRight size={15} strokeWidth={2.5} />
              </button>
            </form>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="#home" className="inline-flex items-center gap-2.5" aria-label="internee.pk home">
              <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl">
                <span className="absolute inset-0 bg-gradient-to-br from-violet-glow to-cyan-glow" />
                <span className="relative font-display text-lg font-bold text-white">i.</span>
              </span>
              <span className="font-display text-xl font-semibold tracking-tight text-white">
                internee<span className="text-violet-glow">.pk</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              Pakistan&apos;s outcome-first internship platform. Cohort-based programs in
              engineering, design, data, and growth — built for students, by people who
              ship.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { Icon: Github, label: 'GitHub', href: '#' },
                { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                { Icon: Twitter, label: 'Twitter', href: '#' },
                { Icon: Instagram, label: 'Instagram', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/3 text-white/75 transition hover:border-white/30 hover:bg-white/8 hover:text-white"
                >
                  <Icon size={15} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  {title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-white/75 transition hover:text-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/8 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} internee.pk — Built with care in Pakistan.
          </p>
          <p className="text-xs text-white/35">
            Redesign concept · React · Three.js · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
