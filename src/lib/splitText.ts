/**
 * Accessible text splitting for masked headline reveals.
 *
 * Splits an element's content into words, groups them into visual lines using
 * measured offsets, then wraps each line in an overflow-hidden mask so the
 * line can slide up from nothing.
 *
 * Inline markup (<span class="…">) is preserved: word spans are moved into a
 * clone of their nearest element ancestor, so accent-coloured phrases survive.
 *
 * Accessibility: the visible spans are hidden from the accessibility tree and
 * the original string is exposed via aria-label on the source element — screen
 * readers hear one clean sentence instead of 12 disconnected words.
 */

export interface SplitResult {
  /** One element per measured line (the element to animate). */
  lines: HTMLElement[];
  /** Removes the split and restores the original markup. */
  revert: () => void;
}

const WORD_RE = /\S+/g;

function wrapWords(node: Node, target: HTMLElement) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? '';
    if (!text.trim()) {
      if (text) target.appendChild(document.createTextNode(text));
      return;
    }

    let lastIndex = 0;
    for (const match of text.matchAll(WORD_RE)) {
      const start = match.index ?? 0;
      if (start > lastIndex) {
        target.appendChild(document.createTextNode(text.slice(lastIndex, start)));
      }
      const word = document.createElement('span');
      word.className = 'split-word';
      word.style.display = 'inline-block';
      word.textContent = match[0];
      target.appendChild(word);
      lastIndex = start + match[0].length;
    }
    if (lastIndex < text.length) {
      target.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    return;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return;

  const el = node as HTMLElement;
  if (el.classList.contains('no-split')) return;

  const clone = document.createElement(el.tagName.toLowerCase());
  if (el.className) clone.className = el.className;
  Array.from(el.childNodes).forEach((child) => wrapWords(child, clone));
  target.appendChild(clone);
}

export function splitLines(el: HTMLElement): SplitResult {
  const original = el.innerHTML;
  const originalLabel = el.getAttribute('aria-label');
  const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim();

  if (!text) return { lines: [], revert: () => {} };

  // 1. Rebuild with word-level spans
  const staging = document.createElement('div');
  Array.from(el.childNodes).forEach((child) => wrapWords(child, staging));

  const words = Array.from(staging.querySelectorAll<HTMLElement>('.split-word'));
  if (!words.length) return { lines: [], revert: () => {} };

  // 2. Group words into lines by their vertical offset
  const grouped: HTMLElement[][] = [];
  let currentTop: number | null = null;

  for (const word of words) {
    const top = Math.round(word.getBoundingClientRect().top);
    if (currentTop === null || Math.abs(top - currentTop) > 4) {
      grouped.push([]);
      currentTop = top;
    }
    grouped[grouped.length - 1].push(word);
  }

  // 3. Re-assemble: each line becomes <span class="mask"><span class="split-line">…</span></span>
  const frag = document.createDocumentFragment();
  const lines: HTMLElement[] = [];

  for (const group of grouped) {
    const mask = document.createElement('span');
    mask.className = 'mask';
    const line = document.createElement('span');
    line.className = 'split-line';
    line.style.display = 'block';
    line.style.willChange = 'transform';

    let node: HTMLElement = group[0];
    // Walk up to the direct child of the staging container so inline wrappers
    // (accent spans) are carried along intact.
    while (node.parentElement && node.parentElement !== staging) {
      node = node.parentElement;
    }
    line.appendChild(node);
    mask.appendChild(line);
    frag.appendChild(mask);

    if (group.length > 1 || grouped.length === 1) {
      // Pull any sibling words/elements that belong to the same line
      let next = node.nextSibling;
      while (next) {
        const probe = next as HTMLElement;
        if (probe.nodeType === Node.ELEMENT_NODE) {
          const probeWord = probe.classList.contains('split-word')
            ? probe
            : probe.querySelector<HTMLElement>('.split-word');
          const probeTop = probeWord?.getBoundingClientRect().top;
          if (probeTop !== undefined && Math.abs(Math.round(probeTop) - Math.round(group[0].getBoundingClientRect().top)) > 4) {
            break;
          }
        } else if (probe.nodeType === Node.TEXT_NODE && !probe.textContent?.trim()) {
          // whitespace between inline elements — keep it flowing
          line.appendChild(probe.cloneNode(true));
          next = next.nextSibling;
          continue;
        }
        const consumed = next;
        next = next.nextSibling;
        line.appendChild(consumed);
      }
    }

    lines.push(line);
  }

  el.innerHTML = '';
  el.appendChild(frag);
  el.setAttribute('aria-label', text);

  // Hide decorative spans from AT but keep the aria-label readable
  lines.forEach((l) => l.setAttribute('aria-hidden', 'true'));

  return {
    lines,
    revert: () => {
      el.innerHTML = original;
      if (originalLabel) el.setAttribute('aria-label', originalLabel);
      else el.removeAttribute('aria-label');
    },
  };
}
