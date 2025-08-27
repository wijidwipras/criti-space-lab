// Simple environment access with safe fallbacks
// Reads APP_VERSION from env when available, otherwise from package.json

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const readEnv = (key: string): string | undefined => {
  try {
    // @ts-expect-error process may be undefined in RN
    const fromProcess = typeof process !== 'undefined' ? (process as any)?.env?.[key] : undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fromGlobal = (globalThis as any)?.[key];
    return (fromGlobal as string) || (fromProcess as string) || undefined;
  } catch {
    return undefined;
  }
};

export const APP_VERSION: string = (() => {
  const fromEnv = readEnv('APP_VERSION');
  if (fromEnv && String(fromEnv).trim().length > 0) return String(fromEnv);
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require('../../package.json');
    return String(pkg?.version ?? '0.0.0');
  } catch {
    return '0.0.0';
  }
})();

export default APP_VERSION;

