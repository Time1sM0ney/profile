// components/PageWithTransition.tsx
import { useState, useEffect, useRef } from 'react';
import { AppProps } from 'next/app';
import cn from 'classnames';
const PageWithTransition = ({ Component, pageProps, router }: AppProps) => {
  const prevScreen = useRef(Component);
  const [transitioning, setTransitioning] = useState(false);
  useEffect(() => {
    const handler = () => {
      setTransitioning(true);
      setTimeout(() => {
        prevScreen.current = Component;
        setTransitioning(false);
      }, 280);
    };
    router.events.on('routeChangeComplete', handler);
    return () => {
      router.events.off('routeChangeComplete', handler);
    };
  }, [Component, router.events]);

  const Screen = !transitioning ? Component : prevScreen.current;

  return (
    <div
      className={cn({
        'animate-slideUpEnter': !transitioning,
        'animate-slideUpLeave': transitioning,
      })}
    >
      <Screen {...pageProps} />
    </div>
  );
};
export default PageWithTransition;
