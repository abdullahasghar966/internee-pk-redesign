import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/content';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);
  const paused = useRef(false);

  const go = useCallback(
    (dir) => {
      setDirection(dir);
      setIndex((p) => (p + dir + testimonials.length) % testimonials.length);
    },
    []
  );

  useEffect(() => {
    function tick() {
      if (!paused.current) {
        setDirection(1);
        setIndex((p) => (p + 1) % testimonials.length);
      }
    }
    timerRef.current = setInterval(tick, 6500);
    return () => clearInterval(timerRef.current);
  }, []);

  const current = testimonials[index];
  const initials = current.name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('');

  return (
    <section
      id="stories"
      className="section relative isolate overflow-hidden"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              Stories from cohorts
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="heading-section mt-5 text-balance"
            >
              Real interns. <span className="text-gradient-violet">Real outcomes.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="body-lg mt-5"
            >
              We measure success by what our alumni ship and where they end up — not by
              hours watched or quizzes passed.
            </motion.p>

            <div className="mt-8 flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10"
              >
                <ChevronRight size={18} />
              </button>
              <div className="ml-3 flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? 'w-8 bg-white' : 'w-3 bg-white/25'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative h-[420px] sm:h-[380px] lg:col-span-7" aria-live="polite">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={current.name}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -direction * 40, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="glass-strong relative h-full overflow-hidden rounded-[2rem] p-8 sm:p-10"
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
                  style={{ background: `${current.accent}40` }}
                />
                <Quote
                  className="absolute right-8 top-8 text-white/12"
                  size={56}
                  strokeWidth={1.5}
                />

                <blockquote className="relative max-w-2xl font-display text-2xl font-medium leading-snug text-white/95 sm:text-3xl">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <figcaption className="absolute bottom-8 left-8 right-8 flex items-center gap-4 sm:left-10 sm:right-10">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-full font-display text-base font-semibold text-white ring-2 ring-white/15"
                    style={{
                      background: `linear-gradient(135deg, ${current.accent}, rgba(255,255,255,0.08))`,
                    }}
                  >
                    {initials}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white">{current.name}</div>
                    <div className="text-sm text-white/55">{current.role}</div>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
