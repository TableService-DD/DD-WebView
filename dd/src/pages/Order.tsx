import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tmpGetMenus } from '../api/stocks';
import { FoodItem, Menu } from '../util/types';
import StoreHeader from '../components/StoreHeader';
import MenuCard from '../components/MenuCard';

function Order() {
  const { storeName = 'Default Store', tableNumber = '0' } = useParams<{
    storeName?: string;
    tableNumber?: string;
  }>();
  const [menuData, setMenuData] = useState<Menu | null>(null);
  const category: string[] = [
    'SET',
    'MAIN',
    'PREMIUM',
    'SALAD',
    'SIDE',
    'DRINK',
  ];
  useEffect(() => {
    const fetchData = async () => {
      const menus = await tmpGetMenus();
      setMenuData(menus);
    };
    fetchData();
  }, []);

  return (
    <section className="py-[10px]">
      <div className="px-[10px]">
        <StoreHeader title={storeName} tableNumber={tableNumber} />
      </div>
      <div className="grid grid-cols-4 my-4">
        {category.map((item: string, index: number) => (
          <button key={item}>{item}</button>
        ))}
      </div>
      <div className="w-full h-[2px] bg-primary" />
      <div className="flex flex-col gap-1">
        {menuData ? (
          [...menuData.BURGER, ...menuData.SANDWICH].map((item: FoodItem) => (
            <MenuCard key={item.foodId} menu={item} />
          ))
        ) : (
          <div>Loading menus...</div>
        )}
      </div>
    </section>
  );
}

export default Order;
