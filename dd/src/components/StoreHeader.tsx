type Props = {
  title: string;
  tableNumber: string;
};
function StoreHeader({ title, tableNumber }: Props) {
  return (
    <div className="w-full  p-3 flex items-center mb-4 justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-xl semibold">{title}</h2>
        <span className="text-grayLight text-md">{tableNumber}번</span>
      </div>
      <button className="px-4 py-2 bg-transparent ring-primary ring-2 rounded-xl text-primary semibold">
        빠른요청
      </button>
    </div>
  );
}

export default StoreHeader;
