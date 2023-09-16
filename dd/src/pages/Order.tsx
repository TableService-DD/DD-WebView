import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStocks, tmpGetMenus } from '../api/stocks';
import { FoodItem, Menu, Stock } from '../util/types';
import StoreHeader from '../components/StoreHeader';
import MenuCard from '../components/MenuCard';
import '../style/styles.css';
import Carts from '../components/Carts';
import { CartItem, getCarts } from '../api/carts';
import CartItemBtn from '../components/CartItemBtn';
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
      <StoreHeader title={storeName} tableNumber={tableNumber} />
      {/* CATEGORY SELECT 부분 */}
      <div className="flex gap-5 px-5 overflow-x-scroll hide-scrollbar">
        {category.map((item: string, index: number) => (
          <button
            className="relative w-full px-2 pt-1 pb-3"
            onClick={() => setSelectedCategory(item)}
            key={index}
          >
            <span
              className={`rounded-xl absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[3px] animated-width 
      ${
        selectedCategory === item ? 'w-full bg-gradient-to-r bg-black' : 'w-0'
      }`}
            />
            {item}
          </button>
        ))}
      </div>

      {/* <div className="w-full h-[2px] bg-primary" /> */}

      <div className="flex flex-col h-fit">
        {menuData ? (
          menuData.map((item: Stock, index: number) => (
            <MenuCard key={item.stock_id} menu={item} isFirst={index === 0} />
          ))
        ) : (
          <div>Loading menus...</div>
        )}
      </div>
      {/* {cart.length > 0 && <Carts carts={cart} />} */}
      <CartItemBtn
        title="장바구니 보기"
        price={9000}
        quantity={1}
        link={`/order_list/${storeName}/${tableNumber}`}
      />
    </section>
  );
}

export default Order;
