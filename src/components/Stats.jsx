import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { stats } from '../data/content';
import StatsScene from './three/StatsScene';

function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, mv, to]);

  return (
    <div ref={ref} className="flex items-baseline gap-1 font-display text-5xl font-semibold leading-none tracking-tight sm:text-6xl">
      <motion.span className="text-gradient-violet">{rounded}</motion.span>
      <span className="text-white/55">{suffix}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="section relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <StatsScene />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/40 via-transparent to-ink-900/60" />

      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            The numbers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="heading-section mt-5 text-balance"
          >
            Receipts, not promises.
          </motion.h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.08 * i }}
              className="glass relative overflow-hidden rounded-3xl p-7"
            >
              <Counter to={s.value} suffix={s.suffix} />
              <div className="mt-4 text-sm uppercase tracking-[0.18em] text-white/55">
                {s.label}
              </div>
              <div className="pointer-events-none absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-violet-500/15 blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
