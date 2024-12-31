import { Button, Checkbox, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

interface FormArrType {
  items: { num: string; item: string; isSelected: boolean; id: number }[];
}

interface ContainerTypes {
  data: FormArrType;
  handleDeleteItem: (id: number) => void;
  handleSelected: (id: number) => void;
  handleClearForm: () => void;
}

export default function Container({
  data,
  handleDeleteItem,
  handleSelected,
  handleClearForm,
}: ContainerTypes) {
  const [sortBy, setSortBy] = useState("");

  let sortedData;
  if (sortBy === "" || sortBy === "input") sortedData = data;
  if (sortBy === "description") {
    const sorted = [...data.items].sort((a, b) => a.item.localeCompare(b.item));
    sortedData = { items: sorted };
  } else if (sortBy === "isSelected") {
    const sorted = [...data.items].sort(
      (a, b) => Number(b.isSelected) - Number(a.isSelected)
    );
    sortedData = { items: sorted };
  }

  return (
    <div className="bg-orange-950 w-full h-full flex flex-col justify-between items-center py-8">
      <div className="max-w-[1440px] px-6 flex justify-center gap-10 flex-wrap">
        {sortedData?.items.map((item) => (
          <div key={item?.id} className="flex items-center">
            <Checkbox
              onValueChange={() => handleSelected(item.id)}
              size="sm"
              radius="none"
            />
            <p className="text-xs text-white">
              {item.num} {item?.item}
            </p>
            <IoIosClose
              onClick={() => handleDeleteItem(item.id)}
              color="red"
              size={22}
              className="ml-1 cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-2">
        <Select
          className="w-[160px]"
          radius="full"
          size="sm"
          placeholder="number..."
          color="default"
          variant="flat"
          selectedKeys={[sortBy]}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <SelectItem key="input">sort by order</SelectItem>
          <SelectItem key="description">sort by description</SelectItem>
          <SelectItem key="isSelected">sort by status</SelectItem>
        </Select>
        <Button
          size="sm"
          onPress={handleClearForm}
          radius="full"
          color="default"
        >
          clear list
        </Button>
      </div>
    </div>
  );
}
