


'use client';
// pages/index.tsx
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import useMediaQuery from './components/useMediaQuery';

// 動的インポート
const DesktopComponent = dynamic(() => import('./components/DesktopComponent'));
const MobileComponent = dynamic(() => import('./components/MobileComponent'));

const HomePage: NextPage = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 1024px)');

  return (
    <div>
      {isDesktop && <DesktopComponent />}
      {isMobile && <MobileComponent />}
    </div>
  );
};

export default HomePage;
