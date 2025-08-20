import { useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import UseTodoStore from "../store/todoStore";

// components
import Input from "./Input";
import Btn from "./Btn";
import Select from "./SelectInput";
import Toast from "./Toast";
import { useNavigate } from "react-router-dom";

export default function FormEditing() {
  const { id: taskId } = useParams<{ id?: string }>();
  const inputTasks = UseTodoStore((state) => state.allTasks);
  const arrayOfAlltasks = UseTodoStore((state) => state.inputTasks);
  const setInputTasks = UseTodoStore((state) => state.setInputTasks);
  const setAllTasks = UseTodoStore((state) => state.setAllTasks);
  const setShowToast = UseTodoStore((state) => state.setShowToast);
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const task = inputTasks.find((t) => taskId == t.id);
  // use form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const newTasks = arrayOfAlltasks.map((t) =>
      t.id === taskId ? { ...t, ...data } : t
    );
    setInputTasks(newTasks);
    setAllTasks(newTasks);
    reset();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/");
    }, 2000);
  };

  if (!taskId) {
    return <div>No task selected — maybe create a new one?</div>;
  }

  return (
    <>
      <div>Editing task with ID: {taskId}</div>
      <br />
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
          value={task?.title}
          error={errors.title?.message}
        />
        <br />
        {/* dueDate */}
        <Input
          type="date"
          tagName="DueDate"
          register={register("dueDate", {
            min: { value: today, message: "Can't set past date !!" },
          })}
          value={task?.dueDate}
          error={errors.dueDate?.message}
        />
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
          value={task?.priorty}
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
          value={task?.body}
          error={errors.body?.message}
        />
        <br />
        <Btn text="Save Edits" />
      </form>

      <Toast text="Item Edited successfully." />
    </>
  );
}
