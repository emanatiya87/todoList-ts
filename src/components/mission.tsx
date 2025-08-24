import ChipPriority from "./Chip";
import type { Task } from "../store/todoStore";
import UseTodoStore from "../store/todoStore";
import { Link } from "react-router-dom";
interface MissionProps {
  input: Task;
}
// icons
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { IoMdRemoveCircleOutline } from "react-icons/io";

export default function Mission({ input }: MissionProps) {
  const deleteTask = UseTodoStore((state) => state.deleteTask);
  const completeTask = UseTodoStore((state) => state.completeTask);
  return (
    <>
      <tr
        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 "
        style={{
          backgroundColor: input.isComplete ? "#1f2937" : "",
          color: input.isComplete ? "#9ca3af" : "",
        }}
      >
        <td
          className="px-6 py-4"
          style={{
            textDecoration: input.isComplete ? "line-through" : "none",
          }}
        >
          {input.title}
        </td>
        <td
          className="px-6 py-4"
          style={{
            textDecoration: input.isComplete ? "line-through" : "none",
          }}
        >
          {input.body}
        </td>
        <td className="px-6 py-4">{input.dueDate ?? "-"}</td>
        <td className="px-6 py-4">
          {" "}
          <ChipPriority
            label={input.priorty ?? "Medium"}
            filter={() => () => input.priorty}
          />
        </td>
        <td className="px-6 py-4">
          <div className="flex gap-3 items-center">
            <p
              className="text-3xl text-teal-600 dark:text-blue-500 hover:underline cursor-pointer"
              onClick={() => completeTask(input.id)}
            >
              {input.isComplete ? (
                <IoMdRemoveCircleOutline />
              ) : (
                <IoCheckmarkDoneCircleOutline />
              )}
            </p>
            <Link to={`/edit/${input.id}`}>
              <p className="text-3xl text-blue-600 dark:text-blue-500 hover:underline">
                <MdEditSquare />
              </p>
            </Link>

            <p
              className="text-3xl text-red-600 dark:text-blue-500 hover:underline cursor-pointer"
              onClick={() => deleteTask(input.id)}
            >
              <MdDeleteForever />
            </p>
          </div>
        </td>
      </tr>
    </>
  );
}
