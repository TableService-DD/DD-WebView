import { Link } from 'react-router-dom';

interface Props {
  quantity: number;
  title: string;
  price: number;
  link: string;
}

function CartItemBtn({ quantity, title, price, link }: Props) {
  return (
    <Link
      to={link}
      className="fixed bottom-0 w-full h-[90px] bg-white border-LineGray border-t-[1px] flex justify-center items-center "
    >
      <button className="w-[90%] bg-primary text-white h-[50px] rounded-[10px] flex justify-between items-center px-[18px]">
        <div className="basis-[25%]">
          <span className="rounded-full bg-white text-sm semibold w-[25px] h-[25px] flex items-center justify-center text-primary flex-shrink-0 ">
            {quantity}
          </span>
        </div>
        <span className="semibold text-center">{title}</span>
        <span className="medium flex-shrink-0 basis-[25%]">{price}원</span>
      </button>
    </Link>
  );
}

export default CartItemBtn;
