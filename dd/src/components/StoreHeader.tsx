type Props = {
  title: string;
  tableNumber: string;
};
function StoreHeader({ title, tableNumber }: Props) {
  return (
    <div className="w-full border-[3px] border-menuSection rounded-md p-3 flex items-center gap-2 mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <span className="text-grayLight text-sm">{tableNumber}번</span>
    </div>
  );
}

export default StoreHeader;
