import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import {
  FieldErrors,
  // SubmitHandler,
  // useForm,
  UseFormRegister,
} from "react-hook-form";

const numbers = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

// interface CustomFormState {
//   items: Array<{
//     num: string;
//     item: string;
//     isSelected: boolean;
//     id: number;
//   }>;
// }

interface IFormInput {
  num: string;
  item: string;
}

type FormProps = {
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  // setFormState: React.Dispatch<React.SetStateAction<CustomFormState>>;
};

export default function Form({ register, errors }: FormProps) {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<IFormInput>();
  // const onSubmit: SubmitHandler<IFormInput> = (data) => {
  //   console.log(data);
  //   setFormState((prev) => ({
  //     ...prev,
  //     items: [
  //       ...prev.items,
  //       {
  //         num: data.num,
  //         item: data.item,
  //         isSelected: false,
  //         id: Date.now(), // Use a unique ID
  //       },
  //     ],
  //   }));
  // };

  return (
    <div className="bg-orange-700 w-full h-48 py-4 flex items-center justify-center gap-2">
      <p>What do you need for your trip?</p>
      {/* <form className="flex gap-1" onSubmit={handleSubmit(onSubmit)}> */}
      <div className="flex flex-col gap-1 justify-center items-center relative">
        <Select
          className="w-[150px]"
          {...register("num", { required: true })}
          radius="full"
          size="sm"
          placeholder="number..."
          color="default"
          variant="flat"
        >
          {numbers.map((number) => (
            <SelectItem key={number} value={number}>
              {number}
            </SelectItem>
          ))}
        </Select>
        {errors.num && (
          <span className="text-black text-xs absolute -bottom-5 left-2">
            This field is required
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 justify-center items-center relative">
        <Input
          className="max-w-44"
          {...register("item", { required: true, maxLength: 20 })}
          size="sm"
          radius="full"
          variant="flat"
          placeholder="Item..."
        />
        {errors.item && (
          <span className="text-black text-xs absolute -bottom-5 left-2">
            This field is required
          </span>
        )}
      </div>

      <Button
        radius="full"
        color="primary"
        variant="shadow"
        type="submit"
        size="sm"
      >
        ADD
      </Button>
      {/* </form> */}
    </div>
  );
}
