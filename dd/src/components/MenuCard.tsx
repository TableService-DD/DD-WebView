import { Link } from 'react-router-dom';
import { FoodItem } from '../util/types';

function MenuCard({ menu }: { menu: FoodItem }) {
  return (
    <Link
      to={`/order/${menu.foodId}`}
      className="flex items-center justify-between bg-menuSection px-5 py-1 rounded-md"
    >
      <div className="flex flex-col items-start">
        <h1>{menu.name}</h1>
        <p className=" line-clamp-2 w-[80%] text-[13px] text-grayLight text-start">
          {menu.menu_intro}
        </p>
        <span className="text-sm">{menu.price}원</span>
      </div>
      <img
        className="w-[75px] h-[75px] object-cover rounded-md"
        src={menu.image}
        alt={menu.name}
      />
    </Link>
  );
}

export default MenuCard;
