import { Link } from 'react-router-dom';

interface Props {
  title: string;
  link: string;
}

function OrderBtn({ title, link }: Props) {
  return (
    <Link
      to={link}
      className="fixed bottom-0 w-full h-[90px] bg-white border-LineGray border-t-[1px] flex justify-center items-center "
    >
      <button className="w-[90%] bg-primary text-white h-[50px] rounded-[10px] flex justify-center items-center px-[18px]">
        <span className="semibold text-center">{title}</span>
      </button>
    </Link>
  );
}

export default OrderBtn;
