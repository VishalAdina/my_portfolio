import { useMemo, useState } from 'react';
import { Icon } from './Icon';

interface CodeBlockProps {
  filename: string;
  language: string;
  code: string;
}

type Token = { text: string; kind: 'plain' | 'keyword' | 'string' | 'comment' | 'number' | 'func' };

const PY_KEYWORDS = [
  'async', 'await', 'def', 'class', 'return', 'if', 'not', 'is', 'in', 'for', 'while',
  'import', 'from', 'with', 'as', 'try', 'except', 'raise', 'None', 'True', 'False',
  'lambda', 'yield', 'else', 'elif', 'pass', 'Optional', 'List', 'Tuple', 'Dict', 'TypedDict',
].join('|');

/**
 * Minimal hand-written tokeniser for the Python snippets in project data.
 * Intentionally tiny: one regex pass, no Prism/Shiki payload on the critical
 * path, and tokens are rendered as React nodes so nothing is injected as HTML.
 */
function tokenize(code: string): Token[] {
  const pattern = new RegExp(
    [
      '(#[^\\n]*)', // 1 comment
      '("""[\\s\\S]*?"""|\'[^\']*\'|"[^"]*")', // 2 string
      '\\b(\\d+\\.?\\d*)\\b', // 3 number
      `\\b(${PY_KEYWORDS})\\b`, // 4 keyword
      '([A-Za-z_][\\w]*)(?=\\()', // 5 function call
    ].join('|'),
    'g',
  );

  const tokens: Token[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(code))) {
    if (match.index > last) tokens.push({ text: code.slice(last, match.index), kind: 'plain' });

    const kind: Token['kind'] = match[1]
      ? 'comment'
      : match[2]
        ? 'string'
        : match[3]
          ? 'number'
          : match[4]
            ? 'keyword'
            : 'func';

    tokens.push({ text: match[0], kind });
    last = match.index + match[0].length;
  }

  if (last < code.length) tokens.push({ text: code.slice(last), kind: 'plain' });
  return tokens;
}

const COLORS: Record<Token['kind'], string> = {
  plain: 'text-fg-2',
  keyword: 'text-accent',
  string: 'text-[#8fd3c7]',
  comment: 'text-fg-3/70 italic',
  number: 'text-[#e0b0f0]',
  func: 'text-[#d8dca0]',
};

export function CodeBlock({ filename, language, code }: CodeBlockProps) {
  const tokens = useMemo(() => tokenize(code), [code]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — silent no-op */
    }
  };

  return (
    <figure className="border border-line-2 bg-[#0a0b0d]">
      <figcaption className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="flex items-center gap-2.5">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-fg-2">{filename}</span>
          <span className="label hidden sm:inline">{language}</span>
        </span>
        <button
          type="button"
          onClick={copy}
          data-cursor="link"
          className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-fg-3 uppercase transition-colors duration-300 hover:text-accent"
        >
          <Icon name={copied ? 'check' : 'copy'} size={13} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </figcaption>

      <pre className="overflow-x-auto p-4 text-[0.75rem] leading-relaxed sm:p-5 sm:text-[0.8125rem]">
        <code className="font-mono">
          {tokens.map((token, i) => (
            <span key={i} className={COLORS[token.kind]}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
