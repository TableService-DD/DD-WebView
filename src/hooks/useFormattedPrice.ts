import { useEffect, useState } from 'react';
function useFormattedPrice(value: string) {
  const [formattedPrice, setFormattedPrice] = useState('0');

  useEffect(() => {
    if (value) {
      const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setFormattedPrice(formatted);
    } else {
      setFormattedPrice('0');
    }
  }, [value]);

  return formattedPrice;
}
