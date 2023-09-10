import { useEffect, useState } from 'react';
import { getStocks, addStocksImage, getDetailStocks } from '../api/stocks';
import Header from '../components/Header';
import { IMAGE_URL } from '../api';
import { Stock } from '../util/types';
import { useParams } from 'react-router-dom';

function FoodDetail() {
  const [stocks, setStocks] = useState<Stock[] | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { stock_id } = useParams<{ stock_id: string }>();
  useEffect(() => {
    const fetchStocks = async () => {
      const result = await getDetailStocks(stock_id);
      setStocks(result);
    };

    fetchStocks();
  }, []);

  return (
    <section>
      <Header title="옵션" />
      <div>
        {stocks ? (
          stocks.map((stock) => (
            <div key={stock.stock_id}>
              <h1>{stock.stock_name}</h1>
              <img
                className="w-full p-4 border-2 h-[200px]"
                src={`${stock.stock_image[0]}`}
                alt={stock.stock_name}
              />
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
