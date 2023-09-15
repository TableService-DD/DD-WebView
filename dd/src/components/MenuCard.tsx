import { Link } from 'react-router-dom';
import { Stock } from '../util/types';

interface MenuCardProps {
  menu: Stock;
  isFirst: boolean;
}

function MenuCard({ menu, isFirst }: MenuCardProps) {
  return (
    <Link
      to={`/order/${menu.stock_id}`}
      className={`flex items-center justify-between px-5 py-1 ${
        isFirst ? 'border-none' : 'border-t-[1px]'
      }`}
    >
      <div className="flex flex-col items-start">
        <h1>{menu.stock_name}</h1>
        <p className="line-clamp-2 w-[100%] text-[13px] text-grayLight text-start">
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
