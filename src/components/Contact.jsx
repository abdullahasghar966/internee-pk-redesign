import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, Loader2, AlertCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useFormValidation, validators } from '../hooks/useFormValidation';

const tracksList = [
  'Web Development',
  'Mobile Engineering',
  'AI & Machine Learning',
  'Data Science',
  'Product Design',
  'Digital Marketing',
];

const schema = {
  fullName: [validators.required('Full name'), validators.minLen(2, 'Full name'), validators.maxLen(60, 'Full name')],
  email: [validators.required('Email'), validators.email()],
  phone: [
    validators.required('Phone'),
    validators.pattern(
      /^[+\d][\d\s\-()]{6,}$/,
      'Enter a valid phone number (digits, +, spaces, or dashes).'
    ),
  ],
  track: [validators.required('Track')],
  message: [validators.required('Message'), validators.minLen(20, 'Message'), validators.maxLen(800, 'Message')],
};

const initial = {
  fullName: '',
  email: '',
  phone: '',
  track: '',
  message: '',
};

function Field({ children, label, htmlFor, error, hint, required }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="flex items-center justify-between text-sm font-medium text-white/85">
        <span>
          {label}
          {required && <span className="ml-1 text-rose-400" aria-hidden="true">*</span>}
        </span>
        {hint && !error && <span className="text-xs text-white/40">{hint}</span>}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-xs text-rose-300"
        >
          <AlertCircle size={13} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

const inputBase =
  'w-full rounded-2xl border bg-white/4 px-4 py-3.5 text-sm text-white placeholder:text-white/35 transition focus:outline-none focus:ring-0';
const inputOk = 'border-white/12 focus:border-violet-glow focus:bg-white/6';
const inputBad = 'border-rose-400/55 focus:border-rose-400';

export default function Contact() {
  const {
    values,
    errors,
    touched,
    submitState,
    setSubmitState,
    setField,
    handleBlur,
    validateAll,
    reset,
  } = useFormValidation(initial, schema);

  const firstErrorRef = useRef(null);

  useEffect(() => {
    if (submitState !== 'success') return;
    const t = setTimeout(() => reset(), 4500);
    return () => clearTimeout(t);
  }, [submitState, reset]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { isValid, firstInvalid } = validateAll();
    if (!isValid) {
      requestAnimationFrame(() => {
        const node =
          firstInvalid && document.getElementById(firstInvalid);
        node?.focus();
        node?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      return;
    }
    setSubmitState('submitting');
    await new Promise((res) => setTimeout(res, 1100));
    setSubmitState('success');
  };

  return (
    <section id="contact" className="section relative isolate overflow-hidden">
      <div className="container-x">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              Start your application
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="heading-section mt-5 text-balance"
            >
              Let&apos;s talk about your <span className="text-gradient-violet">next 14 weeks.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="body-lg mt-5"
            >
              Tell us a little about you and what you want to build. A program lead will
              get back to you within one working day.
            </motion.p>

            <div className="mt-10 space-y-3">
              {[
                { icon: Mail, label: 'hello@internee.pk' },
                { icon: Phone, label: '+92 300 1234567' },
                { icon: MapPin, label: 'Lahore · Karachi · Islamabad · Remote' },
              ].map((c) => (
                <div
                  key={c.label}
                  className="glass flex items-center gap-4 rounded-2xl px-4 py-3.5"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/25 to-cyan-400/15 ring-1 ring-white/10">
                    <c.icon size={16} strokeWidth={1.75} className="text-white" />
                  </div>
                  <span className="text-sm text-white/80">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={onSubmit}
              noValidate
              className="glass-strong relative overflow-hidden rounded-[2rem] p-7 sm:p-9"
              aria-busy={submitState === 'submitting'}
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />

              <div className="relative grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full name"
                  htmlFor="fullName"
                  error={touched.fullName && errors.fullName}
                  required
                >
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Abdullah Asghar"
                    value={values.fullName}
                    onChange={(e) => setField('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    aria-invalid={!!(touched.fullName && errors.fullName)}
                    aria-describedby={
                      touched.fullName && errors.fullName ? 'fullName-error' : undefined
                    }
                    className={`${inputBase} ${
                      touched.fullName && errors.fullName ? inputBad : inputOk
                    }`}
                  />
                </Field>

                <Field
                  label="Email"
                  htmlFor="email"
                  error={touched.email && errors.email}
                  required
                >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@university.edu.pk"
                    value={values.email}
                    onChange={(e) => setField('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    aria-invalid={!!(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                    className={`${inputBase} ${touched.email && errors.email ? inputBad : inputOk}`}
                  />
                </Field>

                <Field
                  label="Phone"
                  htmlFor="phone"
                  error={touched.phone && errors.phone}
                  hint="WhatsApp preferred"
                  required
                >
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+92 3XX XXXXXXX"
                    value={values.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    aria-invalid={!!(touched.phone && errors.phone)}
                    aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
                    className={`${inputBase} ${touched.phone && errors.phone ? inputBad : inputOk}`}
                  />
                </Field>

                <Field
                  label="Track of interest"
                  htmlFor="track"
                  error={touched.track && errors.track}
                  required
                >
                  <select
                    id="track"
                    name="track"
                    value={values.track}
                    onChange={(e) => setField('track', e.target.value)}
                    onBlur={() => handleBlur('track')}
                    aria-invalid={!!(touched.track && errors.track)}
                    aria-describedby={touched.track && errors.track ? 'track-error' : undefined}
                    className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%221.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px_18px] bg-[position:right_14px_center] bg-no-repeat pr-12 ${
                      touched.track && errors.track ? inputBad : inputOk
                    }`}
                  >
                    <option value="" className="bg-ink-900">
                      Pick a track…
                    </option>
                    {tracksList.map((t) => (
                      <option key={t} value={t} className="bg-ink-900">
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="sm:col-span-2">
                  <Field
                    label="Tell us what you want to build"
                    htmlFor="message"
                    error={touched.message && errors.message}
                    hint={`${values.message.length}/800`}
                    required
                  >
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="I'm a 4th-semester CS student. I want to ship a real React + Node SaaS this summer and get serious mentor feedback…"
                      value={values.message}
                      onChange={(e) => setField('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      maxLength={800}
                      aria-invalid={!!(touched.message && errors.message)}
                      aria-describedby={
                        touched.message && errors.message ? 'message-error' : undefined
                      }
                      className={`${inputBase} resize-none ${
                        touched.message && errors.message ? inputBad : inputOk
                      }`}
                    />
                  </Field>
                </div>
              </div>

              <div className="relative mt-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="text-xs text-white/45">
                  By submitting, you agree to receive a one-time follow-up from a program
                  lead. No spam, ever.
                </p>
                <button
                  type="submit"
                  disabled={submitState === 'submitting' || submitState === 'success'}
                  className="btn-primary disabled:opacity-70"
                >
                  {submitState === 'submitting' && (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  )}
                  {submitState === 'success' && (
                    <>
                      <Check size={16} strokeWidth={3} /> Application received
                    </>
                  )}
                  {(submitState === 'idle' || submitState === 'error') && (
                    <>
                      Submit application <Send size={15} strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </div>

              {submitState === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  aria-live="polite"
                  className="relative mt-5 flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
                >
                  <Check size={16} className="mt-0.5 flex-shrink-0" />
                  <span>
                    Thanks, {values.fullName.split(' ')[0]}! A program lead will reach
                    out within one working day.
                  </span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
