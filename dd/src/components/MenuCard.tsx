import { Link } from 'react-router-dom';
import { Stock } from '../util/types';

function MenuCard({ menu }: { menu: Stock }) {
  return (
    <Link
      to={`/order/${menu.stock_id}`}
      className="flex items-center justify-between bg-menuSection px-5 py-1 rounded-md"
    >
      <div className="flex flex-col items-start">
        <h1>{menu.stock_name}</h1>
        <p className=" line-clamp-2 w-[100%] text-[13px] text-grayLight text-start">
          {menu.stock_description}
        </p>
        <span className="text-sm">{menu.stock_price}원</span>
      </div>
      <img
        className="w-[75px] h-[75px] object-cover rounded-md"
        src={menu.stock_image[0]}
        alt={menu.stock_name}
      />
    </Link>
  );
}

export default MenuCard;
