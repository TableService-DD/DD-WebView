import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StoreHeader from "../components/StoreHeader";
import MenuCard from "../components/MenuCard";
import "../style/styles.css";
import CartItemBtn from "../components/CartItemBtn";
import { Stock, StockCategory } from "../util/types";
import { getCategory } from "../api/stocks";
function StoreOrder() {
  const navigate = useNavigate();
  const { storeName = "Default Store", tableNumber = "1" } = useParams<{
    storeName?: string;
    tableNumber?: string;
  }>();
  const [menuData, setMenuData] = useState<Stock[] | null>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("SET");
  const [category, setCategory] = useState<StockCategory[]>([]);
useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categories = await getCategory();
        setCategory(categories);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategory();
  }, []);
  
  return (
    <section className="py-[10px] relative">
      <StoreHeader title={storeName} tableNumber={tableNumber} />
      {/* CATEGORY SELECT 부분 */}
      <div className="flex gap-5 px-5 overflow-x-scroll hide-scrollbar">
        {category.map((item: StockCategory, index: number) => (
          <button
            className="relative w-full px-2 pt-1 pb-3"
            onClick={() => setSelectedCategory(item.name)}
            key={index}
          >
            <span
              className={`rounded-xl absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[3px] animated-width 
      ${
        selectedCategory === item.name ? "w-full bg-gradient-to-r bg-primary" : "w-0"
      }`}
            />
            {item.name}
          </button>
        ))}
      </div>

      {/* <div className="w-full h-[2px] bg-primary" /> */}

      {/* <div className="flex flex-col h-fit pb-[90px]">
        {menuData ? (
          menuData.map((item: Stock, index: number) => (
            <MenuCard
              key={item.stock_id}
              store_name={storeName}
              menu={item}
              isFirst={index === 0}
            />
          ))
        ) : (
          <div>Loading menus...</div>
        )}
      </div> */}
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

export default StoreOrder;
