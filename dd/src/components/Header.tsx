import { BsChevronLeft } from 'react-icons/bs';
type Props = {
  title: string;
};

function Header({ title }: Props) {
  return (
    <section className="flex items-center justify-between h-[80px] border-2 px-6">
      <div className="w-1/4 text-center">
        <BsChevronLeft size={32} onClick={() => console.log('HI')} />
      </div>
      <h1 className="w-2/4 text-center text-[22px]">{title}</h1>
      <div className="w-1/4"></div>
    </section>
  );
}

export default Header;
