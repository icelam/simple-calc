import 'core-js/stable';

import '@style/calc.scss';

import SimpleCalculator from '@js/calc';

// Calculator init
const calc = new SimpleCalculator();
calc.init();

// PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then((registration) => {
      console.log('SW registered: ', registration);
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
