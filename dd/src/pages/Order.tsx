import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStocks, tmpGetMenus } from '../api/stocks';
import { FoodItem, Menu, Stock } from '../util/types';
import StoreHeader from '../components/StoreHeader';
import MenuCard from '../components/MenuCard';
import '../style/styles.css';
import Carts from '../components/Carts';
import { CartItem, getCarts } from '../api/carts';
function Order() {
  const navigate = useNavigate();
  const { storeName = 'Default Store', tableNumber = '0' } = useParams<{
    storeName?: string;
    tableNumber?: string;
  }>();
  const [menuData, setMenuData] = useState<Stock[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('SET');
  const category: string[] = [
    'SET',
    'MAIN',
    'PREMIUM',
    'SALAD',
    'SIDE',
    'DRINK',
  ];
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const menus = await getStocks();
  //     setMenuData(menus);
  //   };
  //   fetchData();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      const menus = await tmpGetMenus();
      setMenuData(menus);
    };
    fetchData();
  });
  // CART  DATA

  // const [cart, setCart] = useState<CartItem[]>([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await getCarts();
  //     if (result !== false) {
  //       setCart(result as CartItem[]);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <section className="py-[10px] relative">
      <div className="px-[10px]">
        <StoreHeader title={storeName} tableNumber={tableNumber} />
      </div>
      {/* CATEGORY SELECT 부분 */}
      <div className="grid grid-cols-4 my-4 px-4">
        {category.map((item: string, index: number) => (
          <button
            className="relative w-full px-2 py-1"
            onClick={() => setSelectedCategory(item)}
            key={item}
          >
            <span
              className={`rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[3px] animated-width 
          ${
            selectedCategory === item
              ? 'w-4/5 bg-gradient-to-r from-orange-300 to-orange-600'
              : 'w-0'
          }`}
            />
            {item}
          </button>
        ))}
      </div>

      <div className="w-full h-[2px] bg-primary" />
      <div className="flex flex-col gap-1">
        {menuData ? (
          menuData.map((item: Stock) => (
            <MenuCard key={item.stock_id} menu={item} />
          ))
        ) : (
          <div>Loading menus...</div>
        )}
      </div>
      {/* {cart.length > 0 && <Carts carts={cart} />} */}

      <div className="flex justify-center">
        <button
          onClick={() => navigate('/')}
          className="fixed bottom-3 text-2xl max-w-sm font-bold w-[80%] self-center h-[40px] bg-white text-black border-2 border-primary rounded-full"
        >
          주문 준비
        </button>
      </div>
    </section>
  );
}

export default Order;
