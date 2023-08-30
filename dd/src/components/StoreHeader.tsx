type Props = {
  title: string;
  tableNumber: string;
};
function StoreHeader({ title, tableNumber }: Props) {
  return (
    <div className="w-full border-[3px] border-gray-300 rounded-md p-3 flex items-center mb-4 justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-grayLight text-md">{tableNumber}번</span>
      </div>
      <button className="p-1 px-2 bg-transparent ring-primary ring-2 rounded-md">
        빠른요청
      </button>
    </div>
  );
}

export default StoreHeader;
