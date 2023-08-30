import { FoodItem } from "@/util/types";
import Image from "next/image";

function MenuCard({ menu }: { menu: FoodItem }) {
  return (
    <div className="flex items-center justify-between bg-menuSection px-2 py-1 rounded-md">
      <div className="flex flex-col">
        <h1>{menu.name}</h1>
        <p className=" line-clamp-2 text-[13px] text-grayLight">
          {menu.menu_intro}
        </p>
        <span className="text-sm">{menu.price}원</span>
      </div>
      <div className="w-20 h-20 relative">
        <Image
          className="object-contain"
          src={menu.image}
          alt={menu.name}
          layout="fill"
        />
      </div>
    </div>
  );
}

export default MenuCard;
