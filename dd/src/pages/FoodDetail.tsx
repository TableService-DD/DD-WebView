import { useEffect, useState } from 'react';
import { Stock, getStocks } from '../api/stocks';

function FoodDetail() {
  const [stocks, setStocks] = useState<Stock[] | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      const result = await getStocks();
      setStocks(result);
    };

    fetchStocks();
  }, []);
  return (
    <section>
      <div>
        {stocks ? (
          stocks.map((stock) => (
            <div key={stock.stock_id}>
              <h1>{stock.stock_name}</h1>
            </div>
          ))
        ) : (
          <h1>로딩중...</h1>
        )}
      </div>
    </section>
  );
}

export default FoodDetail;
