import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { process } from '../data/content';
import ScrollScene from './three/ScrollScene';

export default function HowItWorks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      id="process"
      ref={ref}
      className="section relative isolate overflow-hidden"
    >
      <motion.div
        style={{ opacity: sceneOpacity }}
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <ScrollScene />
      </motion.div>

      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            How it works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="heading-section mt-5 text-balance"
          >
            Four steps. <span className="text-gradient-violet">Zero fluff.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="body-lg mx-auto mt-5 max-w-xl"
          >
            From application to offer, the path is the same for everyone — fair, fast,
            and ruthlessly focused on what you can ship.
          </motion.p>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-12 hidden h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block"
          />

          <ol className="grid gap-5 lg:grid-cols-4">
            {process.map((step, i) => (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="glass relative h-full rounded-3xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.32em] text-white/45">
                      step {step.step}
                    </span>
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/15 ring-1 ring-white/10">
                      <step.icon size={18} strokeWidth={1.75} className="text-white" />
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{step.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
