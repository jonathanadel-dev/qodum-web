import { z } from 'zod';


// Types
const INT = /^-?\d+$/;
const FLOAT = /^-?\d+(\.\d+)?$/;
const INT32 = 2147483647; // Postgres Int max


// number = valid, null = empty, undefined = invalid
const toNumber = (v: string | number | null | undefined, isInt: boolean): number | null | undefined => {
  if (v === null || v === undefined) return null;
  if (typeof v === 'string') {
    const s = v.trim();
    if (s === '') return null;
    if (!(isInt ? INT : FLOAT).test(s)) return undefined;
    v = Number(s);
  }
  if (!Number.isFinite(v)) return undefined;
  if (isInt && (!Number.isInteger(v) || Math.abs(v) > INT32)) return undefined;
  return v;
};
const make = (isInt: boolean, msg: string) => {
  const input = z.union([z.string(), z.number(), z.null(), z.undefined()]);
  return {
    // empty → null
    optional: () => input.transform((v, ctx): number | null => {
      const n = toNumber(v, isInt);
      if (n === undefined) { ctx.addIssue({ code: 'custom', message: msg }); return z.NEVER; }
      return n;
    }),
    required: () => input.transform((v, ctx): number => {
      const n = toNumber(v, isInt);
      if (n === undefined || n === null) {
        ctx.addIssue({ code: 'custom', message: n === null ? '*Please enter a value' : msg });
        return z.NEVER;
      }
      return n;
    }),
  };
};

 
export const zInt = make(true, '*Please enter a whole number');
export const zFloat = make(false, '*Please enter a number');


// Numeric string
export const zNumericString = {
  // '' allowed
  optional: () => z.string().regex(/^\d*$/, '*Please enter digits only'),
  required: () => z.string().min(1, '*Please enter a value').regex(/^\d+$/, '*Please enter digits only')
};