// View Transitions utility for React 19+ and browser compatibility

export function enableViewTransitions() {
  if (typeof document !== 'undefined') {
    // Check if browser supports View Transitions API
    if (!document.startViewTransition) {
      // Polyfill for browsers that don't support View Transitions
      (document as any).startViewTransition = (callback: () => void) => {
        // Execute callback immediately for unsupported browsers
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

export function isViewTransitionSupported(): boolean {
  return typeof document !== 'undefined' && 'startViewTransition' in document;
}

// Helper function to wrap navigation with view transitions
export function navigateWithTransition(callback: () => void): void {
  if (isViewTransitionSupported() && document.startViewTransition) {
    document.startViewTransition(callback);
  } else {
    callback();
  }
}

// React 19 experimental View Transitions preparation
// This will be useful when React's <ViewTransition> component is stable
export function prepareReactViewTransitions() {
  // Future: This is where we'd configure React's experimental View Transitions
  // For now, we rely on the browser's native API
  if (typeof window !== 'undefined') {
    // Add meta tag to enable view transitions if not already present
    const existingMeta = document.querySelector('meta[name="view-transition"]');
    if (!existingMeta) {
      const meta = document.createElement('meta');
      meta.name = 'view-transition';
      meta.content = 'same-origin';
      document.head.appendChild(meta);
    }
  }
} 