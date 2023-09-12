import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
type Props = {
  title: string;
};

function Header({ title }: Props) {
  const navigate = useNavigate();
  return (
    <section className="flex items-center justify-between h-[80px] px-6">
      <div className="w-1/4 text-center">
        <BsChevronLeft size={32} onClick={() => navigate(-1)} />
      </div>
      <h1 className="w-2/4 text-center text-[22px]">{title}</h1>
      <div className="w-1/4"></div>
    </section>
  );
}

export default Header;
