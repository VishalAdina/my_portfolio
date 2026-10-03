import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { MotionProvider } from './components/ui/MotionProvider';
import './index.css';

/**
 * Mark the document as motion-capable *before* React paints.
 *
 * The `motion-ready` class is what arms the pre-animation states (hidden
 * headlines, un-revealed blocks). If JS never runs — or the visitor prefers
 * reduced motion — the class is absent and every element renders visible.
 */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion-ready');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionProvider>
      <App />
    </MotionProvider>
  </StrictMode>,
);
