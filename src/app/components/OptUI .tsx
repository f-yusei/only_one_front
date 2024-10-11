import { useEffect } from 'react';

const NoScrollComponent = () => {
  useEffect(() => {
    // マウント時にスクロールを無効化
    document.body.style.overflow = 'hidden';
    
    // アンマウント時にスクロールを元に戻す
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return null;
};


export default NoScrollComponent;