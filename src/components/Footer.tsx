interface FooterType {
  itemsNum: number;
  selectedCount: number;
}

export default function Footer({ itemsNum, selectedCount }: FooterType) {
  const percentage = itemsNum > 0 ? (selectedCount / itemsNum) * 100 : 0;
  return (
    <div className="bg-blue-500 flex justify-center items-center">
      You have {itemsNum} items on your list, and you already packed{" "}
      {selectedCount} ({percentage.toFixed(0)}%)
    </div>
  );
}
