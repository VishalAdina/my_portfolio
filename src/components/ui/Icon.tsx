import type { ReactElement, SVGProps } from 'react';

/**
 * Hand-rolled inline SVG icon set.
 *
 * Deliberately not a font (Material Symbols was previously pulling ~200 kB of
 * glyph data for 25 icons) and not an icon library — 30 paths cost less than
 * one dependency and guarantee a consistent 1.5px stroke across the site.
 */

export type IconName =
  | 'arrowRight'
  | 'arrowUpRight'
  | 'arrowDown'
  | 'arrowUp'
  | 'close'
  | 'search'
  | 'check'
  | 'star'
  | 'shield'
  | 'file'
  | 'trophy'
  | 'menu'
  | 'mail'
  | 'github'
  | 'linkedin'
  | 'copy'
  | 'print'
  | 'chevronDown'
  | 'plus'
  | 'sparkle'
  | 'server'
  | 'monitor'
  | 'cpu'
  | 'database'
  | 'cloud'
  | 'layers'
  | 'command'
  | 'bolt'
  | 'target'
  | 'book'
  | 'award';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

const STROKE: Partial<Record<IconName, ReactElement>> = {
  arrowRight: <path d="M4 12h15m0 0-6-6m6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7m0 0H9m8 0v8" />,
  arrowDown: <path d="M12 5v14m0 0 6-6m-6 6-6-6" />,
  arrowUp: <path d="M12 19V5m0 0-6 6m6-6 6 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20.5 20.5 16 16" />
    </>
  ),
  check: <path d="M4 12.8 9 18 20 6.5" />,
  star: (
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 17l-5.3 2.7 1.1-5.9L3.5 9.7l5.9-.8z" />
  ),
  shield: (
    <>
      <path d="M12 3l7.5 3v6c0 4.6-3.1 7.8-7.5 9.3C7.6 19.8 4.5 16.6 4.5 12V6z" />
      <path d="M9 12.2l2.1 2.1 4-4.3" />
    </>
  ),
  file: (
    <>
      <path d="M13.5 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V8z" />
      <path d="M13.5 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v4.5a4 4 0 0 1-8 0z" />
      <path d="M8 5.5H5.5V8a3 3 0 0 0 3 3M16 5.5h2.5V8a3 3 0 0 1-3 3" />
      <path d="M12 12.5V16m-3 4h6m-3.5-4h1v4h-1z" />
    </>
  ),
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3.8 7 8.2 6 8.2-6" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="1.5" />
      <path d="M15 6.5V5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15h1" />
    </>
  ),
  print: (
    <>
      <path d="M7 8V3.5h10V8" />
      <rect x="4" y="8" width="16" height="8" rx="1.5" />
      <path d="M7 14h10v6.5H7z" />
    </>
  ),
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  sparkle: <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9z" />,
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M9 20h6m-3-4v4" />
    </>
  ),
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </>
  ),
  cloud: <path d="M6.5 18.5A4 4 0 0 1 6 10.6a5.5 5.5 0 0 1 10.6-1.4A3.9 3.9 0 0 1 18 18.5z" />,
  layers: (
    <>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5z" />
      <path d="m3.5 12.5 8.5 4.5 8.5-4.5" />
    </>
  ),
  command: (
    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
  ),
  bolt: <path d="M13.5 2.5 5 13.5h5.5L10 21.5l8.5-11H13z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v18H5.5A1.5 1.5 0 0 0 4 19.5z" />
      <path d="M8 3v18" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.5 13.5-1 7.5 4.5-2.6 4.5 2.6-1-7.5" />
    </>
  ),
};

/** Brand marks ship as fills so they keep their proper silhouette. */
const FILLED: Partial<Record<IconName, ReactElement>> = {
  github: (
    <path d="M12 2C6.48 2 2 6.48 2 12.02c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12.02C22 6.48 17.52 2 12 2z" />
  ),
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.4 8.75 22 11.1 22 14.2V21h-4v-6c0-1.43-.03-3.28-2-3.28-2 0-2.3 1.56-2.3 3.17V21h-4z" />
  ),
};

export function Icon({ name, size = 18, ...rest }: IconProps) {
  const filled = FILLED[name];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {filled ?? STROKE[name]}
    </svg>
  );
}
