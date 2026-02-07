import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './background.css'; // Import the background CSS
import './styles/animations.css'; // Premium scroll animations
import './styles/space-theme.css'; // Space theme styles
import { AnimationProvider } from './components/AnimationProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AnimationProvider>
      <App />
    </AnimationProvider>
  </StrictMode>
);
