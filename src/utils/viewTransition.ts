import { useRouter } from 'next/router';
import { useCallback } from 'react';

/**
 * Hook to handle navigation with View Transitions API
 * Similar to how Astro's ClientRouter works
 */
export function useViewTransitionRouter() {
  const router = useRouter();

  const push = useCallback(
    async (href: string) => {
      if (
        typeof document !== 'undefined' &&
        'startViewTransition' in document &&
        typeof (document as any).startViewTransition === 'function'
      ) {
        // Use View Transitions API
        const transition = (document as any).startViewTransition(async () => {
          await router.push(href);
        });
        
        try {
          await transition.finished;
        } catch {
          // Transition was skipped or cancelled, that's fine
        }
      } else {
        // Fallback for browsers without View Transitions API
        await router.push(href);
      }
    },
    [router]
  );

  return { push, pathname: router.pathname };
}

/**
 * Navigate with view transition - can be used outside of React components
 */
export function navigateWithTransition(
  router: ReturnType<typeof useRouter>,
  href: string
) {
  if (
    typeof document !== 'undefined' &&
    'startViewTransition' in document &&
    typeof (document as any).startViewTransition === 'function'
  ) {
    (document as any).startViewTransition(async () => {
      await router.push(href);
    });
  } else {
    void router.push(href);
  }
}
