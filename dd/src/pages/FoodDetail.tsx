import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { getStocks, addStocksImage, getDetailStocks } from '../api/stocks';
import Header from '../components/Header';
import { IMAGE_URL } from '../api';
import { Stock } from '../util/types';
import { useParams } from 'react-router-dom';

function FoodDetail() {
  const [stocks, setStocks] = useState<Stock | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { stock_id } = useParams<{ stock_id: string }>();

  useEffect(() => {
    const fetchStocks = async () => {
      if (stock_id) {
        console.log(stock_id);
        const result = await getDetailStocks(stock_id);
        setStocks(result);
        console.log(result);
      }
    };

    fetchStocks();
  }, [stock_id]);

  return (
    <section>
      <Header title="옵션" />
      {stocks && (
        <div key={stock_id} className="bg-menuSection pb-6">
          <img
            className="w-full border-2 h-[200px] object-cover"
            src={stocks.stock_image[0]}
            alt={stocks.stock_name}
          />
          <div className="flex flex-col px-5 gap-2">
            <DetailCard>
              <p className="flex items-center justify-between w-full">
                <span className="text-2xl font-bold">{stocks.stock_name}</span>
                <span className="font-bold">{stocks.stock_price}원</span>
              </p>
              <p>{stocks.stock_description}</p>
            </DetailCard>
            <DetailCard>
              <h2 className="font-bold">추가 옵션</h2>
              {console.log(stocks.stock_option)}
            </DetailCard>
            <DetailCard>
              <h2 className="font-bold">원산지</h2>
              <ul>
                <li>새우 - 베트남산</li>
                <li>돼지고기 - 국내산</li>
              </ul>
            </DetailCard>
            <DetailCard>
              <h2 className="font-bold">알레르기</h2>
            </DetailCard>
            <button className="w-full bg-primary text-white font-bold text-xl rounded-full py-2 mt-4">
              담기
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default FoodDetail;

interface DetailCardProps {
  children: ReactNode | any;
}

function DetailCard({ children }: DetailCardProps): ReactElement {
  return (
    <div className="flex bg-white p-4 rounded-lg flex-col gap-4">
      {children}
    </div>
  );
}
