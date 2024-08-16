import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // 初期のマッチ状態を設定
    setMatches(media.matches);

    // マッチ状態が変わったら更新するリスナーを登録
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    media.addEventListener('change', listener);

    // コンポーネントがアンマウントされたときにリスナーを削除
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;

