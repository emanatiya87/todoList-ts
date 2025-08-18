import Mission from "./mission";
import useTodoStore from "../store/todoStore";
import type { Task } from "../store/todoStore";
export default function List() {
  const inputTasks = useTodoStore((state) => state.allTasks);
  const tasks = inputTasks.map((t: Task) => <Mission input={t} key={t.id} />);
  return (
    <>
      {/* table missions */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3">
                Priority
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{tasks}</tbody>
        </table>
      </div>
    </>
  );
}
