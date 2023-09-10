import React, { useState } from 'react';
import Header from '../components/Header';
import { addStocks, STORE_CODE } from '../api/stocks';
import { generateStockId } from '../util/uuid';
import { Stock } from '../util/types';

function TmpDetail() {
  const [stockData, setStockData] = useState<Partial<Stock>>({
    store_code: STORE_CODE,
    stock_id: generateStockId(),
    stock_option: {},
    stock_image: [],
  });

  const [optionKeys, setOptionKeys] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStockData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (key: string) => {
    setStockData((prev) => ({
      ...prev,
      stock_option: {
        ...prev.stock_option,
        [key]: 0,
      },
    }));
  };

  const handleAddOptionKey = () => {
    setOptionKeys((prev) => [...prev, '']);
  };

  const handleOptionKeyChange = (index: number, value: string) => {
    const newOptionKeys = [...optionKeys];
    newOptionKeys[index] = value;
    setOptionKeys(newOptionKeys);
    handleOptionChange(value);
  };

  const handleSubmit = async () => {
    if (stockData) {
      const success = await addStocks({
        ...stockData,
        stock_id: generateStockId(),
      } as Stock);
      if (success) {
        alert('Stock added successfully!');
      } else {
        alert('Error adding stock!');
      }
    }
  };

  return (
    <section>
      <Header title="Add Stock" />
      <div className="form-container">
        <input
          type="text"
          name="stock_name"
          placeholder="Stock Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="stock_price"
          placeholder="Stock Price"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="stock_description"
          placeholder="Description"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="stock_category"
          placeholder="Stock Category"
          onChange={handleInputChange}
        />
        {optionKeys.map((key, index) => (
          <input
            key={index}
            type="text"
            value={key}
            placeholder="Option Key"
            onChange={(e) => handleOptionKeyChange(index, e.target.value)}
          />
        ))}
        <button
          className="w-full p-2 bg-primary my-4 text-center text-white"
          onClick={handleAddOptionKey}
        >
          Add Option Key
        </button>
        <button
          className="w-full p-2 bg-primary my-4 text-center text-white"
          onClick={handleSubmit}
        >
          ADD STOCK
        </button>
      </div>
    </section>
  );
}
export default TmpDetail;
