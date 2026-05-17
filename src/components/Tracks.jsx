import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { tracks } from '../data/content';

function TrackCard({ track, i }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState('');

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * 10;
    const ry = (x - 0.5) * 14;
    setTransform(`perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`);
  };
  const onLeave = () => setTransform('perspective(1200px) rotateX(0) rotateY(0) translateZ(0)');

  const Icon = track.icon;

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      style={{ transform }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: 0.05 + (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="card-tilt group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-white/3 p-7 transition-colors duration-500 hover:border-white/20"
    >
      <div
        className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${track.accent}`}
      />
      <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-violet-500/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-center justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0">
          <Icon size={22} className="text-white" strokeWidth={1.75} />
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
          {track.seats}
        </span>
      </div>

      <h3 className="mt-7 font-display text-2xl font-semibold leading-tight text-white">
        {track.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">{track.description}</p>

      <div className="mt-7 flex items-center justify-between border-t border-white/8 pt-5">
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/85 transition-colors hover:text-white"
        >
          Apply to track
          <ArrowUpRight
            size={14}
            strokeWidth={2.5}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
        <div className="flex -space-x-2">
          {['#8b5cf6', '#22d3ee', '#fbbf24'].map((c, idx) => (
            <span
              key={c}
              className="h-6 w-6 rounded-full border-2 border-ink-900"
              style={{ background: c, marginLeft: idx === 0 ? 0 : undefined }}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Tracks() {
  return (
    <section id="tracks" className="section relative isolate overflow-hidden">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            Six tracks. Pick one.
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="heading-section mt-5 text-balance"
          >
            Choose the lane. <span className="text-gradient-violet">We build the road.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="body-lg mx-auto mt-5 max-w-xl"
          >
            Every track ships a portfolio of three production-grade projects, a verified
            certificate, and warm intros to our partner companies.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t, i) => (
            <TrackCard key={t.title} track={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
