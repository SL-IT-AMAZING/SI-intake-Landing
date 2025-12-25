import { useSyncExternalStore } from 'react';

const isMobileQuery = '(max-width: 768px)';

const checkIsMobile = (): boolean => {
  if (typeof window === 'undefined') return false;

  const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.matchMedia(isMobileQuery).matches;

  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobileUA = mobileRegex.test(navigator.userAgent);

  return (hasTouchScreen && isSmallScreen) || isMobileUA;
};

// 기존 함수 (호환성 유지)
export const isMobile = checkIsMobile;

// 새로운 훅 - useSyncExternalStore 사용으로 이중 렌더링 방지
function subscribe(callback: () => void) {
  const mql = window.matchMedia(isMobileQuery);
  mql.addEventListener('change', callback);
  window.addEventListener('resize', callback);
  return () => {
    mql.removeEventListener('change', callback);
    window.removeEventListener('resize', callback);
  };
}

function getSnapshot() {
  return checkIsMobile();
}

function getServerSnapshot() {
  return false;
}

export function useMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
