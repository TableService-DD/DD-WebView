type Props = {
  title: string;
  tableNumber: string;
};
function StoreHeader({ title, tableNumber }: Props) {
  return (
    <div className="w-full flex items-center my-5 justify-between px-5">
      <div className="flex items-center gap-3">
        <h2 className="text-xl semibold">{title}</h2>
        <span className="text-grayLight text-md">{tableNumber}번</span>
      </div>
      <button className="px-4 py-[6px] text-sm ring-primary ring-[1px] rounded-lg text-primary semibold">
        빠른요청
      </button>
    </div>
  );
}

export default StoreHeader;
