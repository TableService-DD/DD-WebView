import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StoreHeader from "../components/StoreHeader";
import MenuCard from "../components/MenuCard";
import "../style/styles.css";
import CartItemBtn from "../components/CartItemBtn";
import { Stock, StockCategory } from "../util/types";
import { getCategory, getStocks } from "../api/stocks";
function StoreOrder() {
  const navigate = useNavigate();
  const { storeName = "Default Store", tableNumber = "1" } = useParams<{
    storeName?: string;
    tableNumber?: string;
  }>();
  const [menuData, setMenuData] = useState<Stock[] | any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [category, setCategory] = useState<StockCategory[]>([]);
  const [stockCache, setStockCache] = useState({});
  useEffect(() => {
  const fetchCategory = async () => {
    try {
      const categories = await getCategory();
      setCategory(categories);
      if (categories.length > 0) {
        setSelectedCategory(categories[0].name); // 첫 번째 카테고리로 설정
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  fetchCategory();
}, []);

  useEffect(() => {
  const fetchStocks = async () => {
    if (!stockCache[selectedCategory]) {
      const categoryObj = category.find(cat => cat.name === selectedCategory);
      if (categoryObj) {
        try {
          const stocks = await getStocks(categoryObj.id);
          if (stocks !== false) {
            setStockCache(prev => ({ ...prev, [selectedCategory]: stocks }));
            setMenuData(stocks);
          }
        } catch (error) {
          console.error('Failed to fetch stocks', error);
        }
      }
    } else {
      setMenuData(stockCache[selectedCategory]);
    }
  };

  if (selectedCategory !== "SET") {
    fetchStocks();
  }
}, [selectedCategory, category, stockCache]);

  return (
    <section className="py-[10px] relative">
      <StoreHeader title={storeName} tableNumber={tableNumber} />
      {/* CATEGORY SELECT 부분 */}
      <div className="flex gap-5 px-5 overflow-x-scroll hide-scrollbar">
        {category?.map((item: StockCategory, index: number) => (
          <button
            className="relative w-full px-2 pt-1 pb-3"
            onClick={() => setSelectedCategory(item.name)}
            key={index}
          >
            <span
              className={`rounded-xl absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[3px] animated-width 
      ${
        selectedCategory === item.name ? "w-full bg-gradient-to-r bg-black" : "w-0"
      }`}
            />
            {item.name}
          </button>
        ))}
      </div>

     {/* <div className="flex flex-col h-fit pb-[90px]">
  {menuData && menuData.length > 0 ? (
    menuData.map((item: Stock, index: number) => (
      <MenuCard key={index} {...item} className="p-2 border-b">
        {item.name}
      </MenuCard>
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

