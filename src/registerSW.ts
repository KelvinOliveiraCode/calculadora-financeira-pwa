/// <reference types="vite/client" />

export function registerServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  if (import.meta.env.DEV) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js', { scope: '/' })
      .then((registration) => {
        console.log('[SW] registrado:', registration.scope);
      })
      .catch((error) => {
        console.error('[SW] falha ao registrar:', error);
      });
  });
}