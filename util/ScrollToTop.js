import { useEffect } from "react";
import { useRouter } from 'next/router';

function useRouterScroll({ behavior = 'smooth', left = 0, top = 0 } = {}) {
  const router = useRouter();
  useEffect(() => {
    // Scroll to given coordinates when router finishes navigating
    // This fixes an inconsistent behaviour between `<Link/>` and `next/router`
    // See https://github.com/vercel/next.js/issues/3249
    const handleRouteChangeComplete = () => {
      window.scrollTo({ top, left, behavior });
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // If the component is unmounted, unsubscribe from the event
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [behavior, left, top]);
}

export default useRouterScroll;