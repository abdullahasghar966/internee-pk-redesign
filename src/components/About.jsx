import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Compass, Users, Target } from 'lucide-react';

const pillars = [
  {
    icon: Compass,
    title: 'Real industry mentors',
    body:
      'Every cohort is paired with engineers, designers, and analysts shipping at real companies — not influencers reading slides.',
  },
  {
    icon: Users,
    title: 'Cohorts that compound',
    body:
      'You graduate with a network — 40+ peers who reviewed your code, fixed your Figma files, and still answer your DMs three years later.',
  },
  {
    icon: Target,
    title: 'Outcome-first curriculum',
    body:
      'No filler theory. Every week ends with a shipped artifact: a deployed feature, a published study, or a portfolio piece.',
  },
];

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section id="about" ref={ref} className="section relative isolate overflow-hidden">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <motion.div
              style={{ y, rotate }}
              className="relative mx-auto h-[420px] w-full max-w-md preserve-3d"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-violet-500/20 to-cyan-400/10 blur-2xl" />
              <div className="glass-strong relative flex h-full w-full flex-col gap-4 rounded-[2rem] p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.28em] text-white/50">
                    sprint 04 / 14
                  </span>
                  <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-medium text-emerald-300">
                    on track
                  </span>
                </div>
                <div className="font-display text-2xl font-semibold leading-tight text-white">
                  Build a billing dashboard with auth, RBAC, and Stripe.
                </div>
                <div className="mt-2 space-y-2">
                  {[
                    { label: 'Auth + sessions', pct: 100 },
                    { label: 'Pricing logic', pct: 80 },
                    { label: 'Mentor review', pct: 35 },
                  ].map((t) => (
                    <div key={t.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-white/65">
                        <span>{t.label}</span>
                        <span className="font-mono text-white/45">{t.pct}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-glow to-cyan-glow"
                          style={{ width: `${t.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-3 rounded-2xl border border-white/8 bg-white/3 p-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-glow to-cyan-glow font-display text-sm font-semibold">
                    HK
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">Hira reviewed your PR</div>
                    <div className="text-xs text-white/45">2 hrs ago · 3 comments</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              The program
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="heading-section mt-5 text-balance"
            >
              We don&apos;t teach courses.
              <br />
              <span className="text-gradient-violet">We run cohorts.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="body-lg mt-5 max-w-xl"
            >
              Fourteen weeks of structured, sprint-based work. You ship one real project
              every two weeks, get reviewed by an industry mentor, and graduate with a
              portfolio recruiters can actually open.
            </motion.p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                  className="glass group relative overflow-hidden rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/25 to-cyan-400/15 ring-1 ring-white/12">
                    <p.icon size={18} className="text-white" strokeWidth={2} />
                  </div>
                  <div className="mt-4 font-display text-lg font-semibold text-white">
                    {p.title}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-white/65">
                    {p.body}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
