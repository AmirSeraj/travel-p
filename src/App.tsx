import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Container from "./components/Container";
import { SubmitHandler, useForm } from "react-hook-form";

interface CustomFormState {
  items: Array<{
    num: string;
    item: string;
    isSelected: boolean;
    id: number;
  }>;
}

interface IFormInput {
  num: string;
  item: string;
}

function App() {
  const [formState, setFormState] = useState<CustomFormState>({
    items: [],
  });

  const handleDelete = useCallback((id: number) => {
    setFormState((prevArr) => ({
      ...prevArr,
      items: prevArr?.items.filter((item) => item.id !== id),
    }));
  }, []);

  const handleIsSelected = useCallback((id: number) => {
    setFormState((prevArr) => ({
      ...prevArr,
      items: prevArr.items.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      ),
    }));
  }, []);

  const selectedCount = useMemo(() => {
    return formState.items.filter((item) => item.isSelected).length;
  }, [formState.items]);

  const handleClearForm = useCallback(() => {
    setFormState({ items: [] });
  }, []);

  console.log("formArr", formState);

  /** form */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setFormState((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          num: data.num,
          item: data.item,
          isSelected: false,
          id: Date.now(), // Use a unique ID
        },
      ],
    }));
  };

  return (
    <div className="app">
      <Header />
      <main className="flex flex-grow flex-col">
        <form className="flex gap-1" onSubmit={handleSubmit(onSubmit)}>
          <Form register={register} errors={errors} />
        </form>
        <Container
          data={formState}
          handleDeleteItem={handleDelete}
          handleSelected={handleIsSelected}
          handleClearForm={handleClearForm}
        />
      </main>
      <Footer
        itemsNum={formState?.items?.length}
        selectedCount={selectedCount}
      />
    </div>
  );
}

export default App;
