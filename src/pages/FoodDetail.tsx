import { ReactElement, ReactNode, useEffect, useState } from "react";
import { getStocks, getDetailStocks } from "../api/stocks";
import Header from "../components/Header";
import { IMAGE_URL } from "../api";
import { Stock } from "../util/types";
import { useParams } from "react-router-dom";
import OrderBtn from "../components/OrderBtn";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Category, FakeCategory } from "../static/FakeCategory";

function FoodDetail() {
  const [stocks, setStocks] = useState<Stock | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { stock_id, storeName } = useParams<{
    stock_id: string;
    storeName: string;
  }>();

  const [selectedOption, setSelectedOption] = useState("");
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
  const [categories, setCategories] = useState<Category[]>(FakeCategory);
  const handleCheckboxChange = (index: number) => {
    const newCategories = [...categories];
    newCategories[index].checked = !newCategories[index].checked;
    setCategories(newCategories);
  };

  return (
    <section>
      <Header title="등촌 칼국수" />
      {stocks && (
        <div key={stock_id} className="flex flex-col pb-6 bg-menuSection ">
          <img
            className="w-full h-[200px] object-cover"
            src={stocks.stock_image[0]}
            alt={stocks.stock_name}
          />
          <div className="flex flex-col pb-[90px]">
            <div className="flex flex-col justify-between w-full py-5 gap-[5px] px-6">
              <h2 className="text-xl semibold">{stocks.stock_name}</h2>
              <p className="text-sm text-textGray">
                {stocks.stock_description} Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Modi, laboriosam.{" "}
              </p>
            </div>
            <p className="flex justify-between items-center py-5 border-y-[0.4px] border-LineGray px-6">
              <span className="medium">가격</span>
              <span className="medium">
                <span className="medium">
                  {stocks.stock_price.toLocaleString()}원
                </span>
              </span>
            </p>
            <div className="px-6 py-5">
              <h2 className="medium mb-4">필수 옵션</h2>
              <div className="flex flex-col gap-7">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="option"
                    value="option1"
                    checked={selectedOption === "option1"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <span className="ml-2">옵션 1</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="option"
                    value="option2"
                    checked={selectedOption === "option2"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <span className="ml-2">옵션 2</span>
                </label>
              </div>
              <p></p>
            </div>
            <div className="px-6 py-5 flex flex-col">
              <h2 className="mb-[17px]">추가 옵션</h2>
              <div className="flex flex-col gap-7">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      name={`checkbox-${index}`}
                      className="mr-2 w-5 h-5 rounded-sm appearance-none ring-[2px] text-primary ring-LineGray checked:bg-primary checked:ring-primary checked:text-white"
                      checked={category.checked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <span className="medium flex-grow">{category.name}</span>
                    <span>+{category.price}원</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="py-5 px-6 border-y-[0.4px] border-LineGray">
              <h2 className="medium mb-4">원산지 및 알레르기 유발 정보</h2>
              <ul className="flex flex-col gap-[9px]">
                <li>새우 - 베트남산</li>
                <li>돼지고기 - 국내산</li>
              </ul>
            </div>
            <div className="flex items-center justify-between px-6 py-5 border-b-[0.4px] border-LineGray">
              <h2 className="text-lg semibold">수량</h2>
              <div className="flex items-center gap-4">
                <MinusCircleOutlined className="text-xl" />
                <span className="medium tracking-normal text-lg">1</span>
                <PlusCircleOutlined className="text-xl" />
              </div>
            </div>
            <OrderBtn
              title={`${stocks.stock_price.toLocaleString()}원 담기`}
              link={`/cart_list/${storeName}/${localStorage.getItem(
                "tableNumber"
              )}`}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default FoodDetail;
