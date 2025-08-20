// import ReactDOM from "react-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import UseTodoStore from "../store/todoStore";
import { useNavigate } from "react-router-dom";

// components
import Input from "./Input";
import Btn from "./Btn";
import Select from "./SelectInput";
import Toast from "./Toast";
export default function addingForm() {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const addTask = UseTodoStore((state) => state.addTask);
  const setShowToast = UseTodoStore((state) => state.setShowToast);
  const navigate = useNavigate();
  // use form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    addTask(data.title, data.body, data.dueDate, data.priorty);
    reset();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
        {/* title */}
        <Input
          type="text"
          tagName="title"
          register={register("title", {
            required: "Title is required",
            minLength: { value: 3, message: "At least 3 chars" },
            maxLength: {
              value: 100,
              message: "not accepted more than 100 charchters",
            },
          })}
          value=""
          error={errors.title?.message}
        />
        <br />
        {/* due date  */}
        <Input
          type="date"
          tagName="DueDate"
          register={register("dueDate", {
            min: { value: today, message: "Can't set past date !!" },
          })}
          value=""
          error={errors.dueDate?.message}
        />
        <br />
        {/* priority */}
        <Select
          register={register("priorty", { required: "Priority is required" })}
          tagName="Priority"
          options={[
            { label: "High", value: "High" },
            { label: "Medium", value: "Medium" },
            { label: "Low", value: "Low" },
          ]}
          error={errors.priorty?.message}
          value=""
        />
        <br />
        {/* description */}
        <Input
          type="text"
          tagName="Description"
          register={register("body", {
            maxLength: {
              value: 100,
              message: "Not accepted more than 100 charchters",
            },
          })}
          value=""
          error={errors.body?.message}
        />

        <br />
        <Btn text="ADD" />
      </form>
      <Toast text="Item Added successfully." />
    </>
  );
}
