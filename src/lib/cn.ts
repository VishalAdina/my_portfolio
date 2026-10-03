/** Tiny className joiner — avoids pulling in clsx for a site this size. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}
