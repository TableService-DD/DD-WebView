import Header from "../components/Header";
import { Stock } from "../util/types";

function FakeDetail() {
  const FakeMenu: Stock = {
    store_code: "FAKE_STORE_001",
    stock_category: "햄버거",
    stock_id: "1",
    stock_name: "햄버거",
    stock_price: "5000",
    stock_description: "맛있는 햄버거",
    stock_option: {
      "토마토 추가": 500,
      "치즈 추가": 700,
    },
    stock_image: [],
  };
  return (
    <section className="flex flex-col">
      <Header title="옵션" />
      <img
        className="w-full object-contain h-[200lx] border-2 "
        src={FakeMenu.stock_image[0]}
        alt={FakeMenu.stock_name}
      />
      <div className="px-5 flex flex-col gap-1 bg-menuSection p-3 ">
        <div className="flex flex-col rounded-md bg-white p-4 gap-5">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{FakeMenu.stock_name}</h1>
            <h1 className="font-bold">{FakeMenu.stock_price}원</h1>
          </div>
          <p className="text-lg">{FakeMenu.stock_description}</p>
        </div>
      </div>
    </section>
  );
}

export default FakeDetail;
