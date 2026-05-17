import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import HeroScene from './three/HeroScene';

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 sm:pt-32"
    >
      <div className="absolute inset-0 -z-10 grid-noise" />
      <div className="absolute inset-0 -z-10 mask-fade-y">
        <HeroScene />
      </div>

      <div className="container-x relative">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.span
              variants={fade}
              initial="hidden"
              animate="show"
              custom={0}
              className="eyebrow"
            >
              <Sparkles size={12} strokeWidth={2.5} />
              Pakistan&apos;s #1 internship platform
            </motion.span>

            <motion.h1
              variants={fade}
              initial="hidden"
              animate="show"
              custom={1}
              className="heading-display mt-6 text-balance"
            >
              <span className="text-gradient">Launch your career</span>
              <br />
              <span className="text-white">in 14 focused weeks.</span>
            </motion.h1>

            <motion.p
              variants={fade}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-6 max-w-xl text-balance text-base text-white/70 sm:text-lg"
            >
              Real projects, real mentors, real offers. Internee.pk pairs you with a cohort,
              a guide, and a portfolio you&apos;ll actually be proud to ship — all online,
              all built around the realities of being a student in Pakistan.
            </motion.p>

            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href="#tracks" className="btn-primary">
                Explore tracks
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
              <a href="#process" className="btn-ghost">
                <Play size={14} strokeWidth={2.5} />
                How it works
              </a>
            </motion.div>

            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-12 grid max-w-lg grid-cols-3 gap-3 sm:gap-6"
            >
              {[
                { k: '52k+', v: 'Alumni' },
                { k: '520+', v: 'Partner companies' },
                { k: '96%', v: 'Completion rate' },
              ].map((m) => (
                <div
                  key={m.v}
                  className="glass rounded-2xl px-3 py-3 text-left sm:px-4 sm:py-4"
                >
                  <div className="font-display text-2xl font-semibold text-white sm:text-3xl">
                    {m.k}
                  </div>
                  <div className="mt-0.5 text-xs text-white/55 sm:text-sm">{m.v}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative hidden h-[520px] lg:col-span-5 lg:block"
            aria-hidden="true"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-10 top-10 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
            </div>
            <div className="glass relative h-full w-full rounded-[2rem] p-2">
              <div className="grid h-full w-full place-items-center rounded-[1.7rem] border border-white/8 bg-gradient-to-br from-white/5 to-white/0">
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="font-mono text-xs uppercase tracking-[0.32em] text-white/40">
                    interactive
                  </span>
                  <span className="font-display text-2xl font-medium text-white/85">
                    Drag your cursor →
                  </span>
                  <span className="text-sm text-white/45">
                    The scene parallaxes to your motion.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:flex"
      >
        <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.32em] text-white/40">
          Scroll
          <span className="block h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
