import { useEffect, useState } from 'react';
import { Stock, getStocks, addStocksImage } from '../api/stocks';
import Header from '../components/Header';
import { IMAGE_URL } from '../api';

function FoodDetail() {
  const [stocks, setStocks] = useState<Stock[] | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      const result = await getStocks();
      setStocks(result);
    };

    fetchStocks();
  }, []);

  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);
      const result = await addStocksImage([formData]);
      if (result) {
        alert('Image uploaded successfully');
      } else {
        alert('Failed to upload the image');
      }
    }
  };

  return (
    <section>
      <Header title="옵션" />
      <div>
        {stocks ? (
          stocks.map((stock) => (
            <div key={stock.stock_id}>
              <h1>{stock.stock_name}</h1>
              <img
                src={`${IMAGE_URL}${stock.stock_images[1]}`}
                alt={stock.stock_name}
              />
            </div>
          ))
        ) : (
          <h1>로딩중...</h1>
        )}
      </div>

      <div>
        <input
          type="file"
          onChange={(e) =>
            setSelectedImage(e.target.files ? e.target.files[0] : null)
          }
        />
        <button onClick={handleImageUpload}>Upload Image</button>
      </div>
    </section>
  );
}

export default FoodDetail;
