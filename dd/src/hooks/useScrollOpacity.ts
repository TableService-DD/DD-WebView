import { useState, useEffect } from 'react';

export default function useScrollOpacity() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let scrollY = window.scrollY;

      if (scrollY < 170) {
        setOpacity(0);
      } else if (scrollY >= 170 && scrollY <= 200) {
        setOpacity((scrollY - 170) / 30);
      } else {
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return opacity;
}
