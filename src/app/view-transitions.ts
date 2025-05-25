export function enableViewTransitions() {
  if (typeof document !== 'undefined') {
    if (!document.startViewTransition) {
      // Polyfill for browsers that don't support View Transitions
      document.startViewTransition = (callback: () => void) => {
        callback();
        return {
          finished: Promise.resolve(undefined),
          ready: Promise.resolve(undefined),
          updateCallbackDone: Promise.resolve(undefined),
          skipTransition: () => {},
        };
      };
    }
  }
} 