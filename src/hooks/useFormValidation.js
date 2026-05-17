import { useCallback, useState } from 'react';

const isNonEmpty = (v) => typeof v === 'string' && v.trim().length > 0;
const isEmail = (v) =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export const validators = {
  required: (label) => (v) => (isNonEmpty(v) ? null : `${label} is required.`),
  minLen: (n, label) => (v) =>
    isNonEmpty(v) && v.trim().length >= n
      ? null
      : `${label} must be at least ${n} characters.`,
  maxLen: (n, label) => (v) =>
    !v || v.length <= n ? null : `${label} must be ${n} characters or fewer.`,
  email: () => (v) => (isEmail(v) ? null : 'Please enter a valid email address.'),
  pattern: (re, msg) => (v) => (re.test(v) ? null : msg),
};

function runRules(rules, value) {
  if (!rules) return null;
  for (const rule of rules) {
    const err = rule(value);
    if (err) return err;
  }
  return null;
}

export function useFormValidation(initialValues, schema) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitState, setSubmitState] = useState('idle'); // idle | submitting | success | error

  const setField = useCallback(
    (name, value) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      if (touched[name]) {
        const err = runRules(schema[name], value);
        setErrors((prev) => ({ ...prev, [name]: err }));
      }
    },
    [schema, touched]
  );

  const handleBlur = useCallback(
    (name) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const err = runRules(schema[name], values[name]);
      setErrors((prev) => ({ ...prev, [name]: err }));
    },
    [schema, values]
  );

  const validateAll = useCallback(() => {
    const next = {};
    let firstInvalid = null;
    for (const key of Object.keys(schema)) {
      const err = runRules(schema[key], values[key]);
      if (err) {
        next[key] = err;
        if (!firstInvalid) firstInvalid = key;
      }
    }
    setErrors(next);
    setTouched(
      Object.keys(schema).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    );
    return { isValid: !firstInvalid, firstInvalid };
  }, [schema, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitState('idle');
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    submitState,
    setSubmitState,
    setField,
    handleBlur,
    validateAll,
    reset,
  };
}
