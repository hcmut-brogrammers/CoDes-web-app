import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import PreloadedApp from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreloadedApp />
  </StrictMode>,
);
