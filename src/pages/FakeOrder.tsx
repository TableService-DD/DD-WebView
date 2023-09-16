import React, { useState } from 'react';
import { OptionItem, OrderItem, addOrders, getOrders } from '../api/order';
import { STORE_CODE } from '../api/stocks';

function FakeOrder() {
  const [orderItem, setOrderItem] = useState<OrderItem>({
    store_code: '',
    table_number: '',
    product_id: '',
    product_price: 0,
    product_count: 0,
    product_option: {},
    product_status: false,
  });

  const [optionName, setOptionName] = useState('');
  const [optionPrice, setOptionPrice] = useState(0);
  const [optionQuantity, setOptionQuantity] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const finalOrderItem = {
      ...orderItem,
      product_option: {
        [optionName]: {
          price: optionPrice,
          quantity: optionQuantity,
        },
      },
    };
    const success = await addOrders(finalOrderItem);
    if (success) {
      alert('Order added successfully!');
    } else {
      alert('Error adding order!');
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <button onClick={() => getOrders()} className="bg-primary p-2 text-white">
        TEST
      </button>
      <h1 className="text-2xl mb-5 font-bold">FakeOrder</h1>
      <div className="bg-white p-5 rounded shadow-lg">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Store Code</label>
          <input
            type="text"
            name="store_code"
            placeholder="Store Code"
            disabled
            value={STORE_CODE}
            onChange={handleInputChange}
            className="p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Table Number</label>
          <input
            type="text"
            name="table_number"
            placeholder="Table Number"
            onChange={handleInputChange}
            className="p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Product ID</label>
          <input
            type="text"
            name="product_id"
            placeholder="Product ID"
            onChange={handleInputChange}
            className="p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Product Price</label>
          <input
            type="number"
            name="product_price"
            placeholder="Product Price"
            onChange={handleInputChange}
            className="p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Product Count</label>
          <input
            type="number"
            name="product_count"
            placeholder="Product Count"
            onChange={handleInputChange}
            className="p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Option Name</label>
          <input
            type="text"
            value={optionName}
            placeholder="Option Name"
            onChange={(e) => setOptionName(e.target.value)}
            className="p-2 w-full border rounded mb-2"
          />
          <label className="block mb-2 text-sm font-bold">Option Price</label>
          <input
            type="number"
            value={optionPrice}
            placeholder="Option Price"
            onChange={(e) => setOptionPrice(Number(e.target.value))}
            className="p-2 w-full border rounded mb-2"
          />
          <label className="block mb-2 text-sm font-bold">
            Option Quantity
          </label>
          <input
            type="number"
            value={optionQuantity}
            placeholder="Option Quantity"
            onChange={(e) => setOptionQuantity(Number(e.target.value))}
            className="p-2 w-full border rounded mb-2"
          />
        </div>

        <div className="mt-5">
          <input
            type="checkbox"
            name="product_status"
            checked={orderItem.product_status}
            onChange={(e) =>
              setOrderItem((prev) => ({
                ...prev,
                product_status: e.target.checked,
              }))
            }
          />
          <label className="ml-2 text-sm font-bold">Product Status</label>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-5 bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default FakeOrder;
