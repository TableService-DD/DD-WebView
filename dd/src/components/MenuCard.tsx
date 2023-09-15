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
      className={`flex items-center justify-between p-5 h-[129px] border-b-[0.4px] border-LineGray ${
        isFirst ? 'border-t-[0.4px]' : ''
      }`}
    >
      <div className="flex flex-col items-start gap-[9px]">
        <h1 className="medium">{menu.stock_name}</h1>
        <p className="line-clamp-2 w-3/4 text-[14px] text-grayLight text-start light">
          {menu.stock_description} Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Quidem, nisi?
        </p>
        <span className="medium">{menu.stock_price.toLocaleString()}원</span>
      </div>
      <img
        className="w-[80px] h-[80px] object-cover rounded-md"
        src={menu.stock_image[0]}
        alt={menu.stock_name}
      />
    </Link>
  );
}

export default MenuCard;
