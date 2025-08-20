import { FaGripLines } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaFlag } from "react-icons/fa";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useTodoStore from "../store/todoStore";
export default function ResponsiveSidebar() {
  // open the menu
  const isOpen = useTodoStore((state) => state.isOpenMenu);
  const setIsOpen = useTodoStore((state) => state.setIsOpenMenu);
  //all tasks from store
  const inputTasks = useTodoStore((state) => state.allTasks);
  const arrayOfAlltasks = useTodoStore((state) => state.inputTasks);
  const setAllTasks = useTodoStore((state) => state.setAllTasks);

  //to get number of every priorty
  function filteredNumber(state) {
    let filtered = inputTasks.filter((t) => {
      return t.priorty == state;
    });
    return filtered.length;
  }
  function filterPriorties(state) {
    let filtered = arrayOfAlltasks.filter((t) => t.priorty == state);
    setAllTasks(filtered);
  }
  // use form for search
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    let searchedontent = data.search.trim();
    let filtered = inputTasks.filter((t) => {
      return t.title.includes(searchedontent);
    });
    setAllTasks(filtered);
    reset();
  };
  return (
    <>
      {/* btn controll */}
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`${
          isOpen == true ? "hidden" : ""
        }  p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
      >
        <FaGripLines className="text-2xl cursor-pointer" />
      </button>
      {/* side bar */}
      <aside
        id="default-sidebar"
        className={`fixed top-5 left-5 h-full z-40 transition-transform lg:w-64 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="h-[90dvh] px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 rounded-4xl">
          <ul className="space-y-2 font-medium mb-4">
            <li className="flex items-center justify-between">
              <span className="ms-3 text-2xl font-bold">Menu</span>
              <FaGripLines
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
            </li>
            <li>
              {/* search */}
              <form
                className=" max-w-sm mx-auto "
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  type="text"
                  tagName="Search"
                  register={register("search")}
                  value=""
                />
              </form>
            </li>
          </ul>
          <ul className="space-y-2 font-medium p-4 mb-3">
            <li>
              <h2 className="font-bold text-start">Tasks:</h2>
            </li>
            <Link
              to="/"
              onClick={() => {
                setAllTasks(arrayOfAlltasks);
              }}
            >
              <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                <svg
                  className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">All Tasks</span>

                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {arrayOfAlltasks.length}
                </span>
              </li>
            </Link>
            <Link to={"/"}>
              <li
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
                onClick={() => {
                  let filtered = arrayOfAlltasks.filter(
                    (t) => t.dueDate == new Date().toISOString().split("T")[0]
                  );
                  setAllTasks(filtered);
                }}
              >
                <FaCalendarDay className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Today Tasks
                </span>
              </li>
            </Link>
            <Link to={"/addTask"}>
              <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                <IoIosAddCircleOutline className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Add Task</span>
              </li>
            </Link>
          </ul>
          <ul className="space-y-2 font-medium p-4 mb-3">
            <li>
              <h2 className="font-bold text-start">Lists:</h2>
            </li>
            <Link to="/">
              <li
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
                onClick={() => filterPriorties("High")}
              >
                <FaFlag className="shrink-0 w-5 h-5 text-[#FECACA] transition duration-75 group-hover:text-[#991B1B] " />
                <span className="flex-1 ms-3 whitespace-nowrap">High</span>

                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {filteredNumber("High")}
                </span>
              </li>
            </Link>
            <Link to="/">
              <li
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
                onClick={() => filterPriorties("Medium")}
              >
                <FaFlag className="shrink-0 w-5 h-5 text-[#FEF3C7] transition duration-75 group-hover:text-[#92400E] " />
                <span className="flex-1 ms-3 whitespace-nowrap">Meduim</span>

                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {filteredNumber("Medium")}
                </span>
              </li>
            </Link>
            <Link to="/">
              <li
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
                onClick={() => filterPriorties("Low")}
              >
                <FaFlag className="shrink-0 w-5 h-5 text-[#D1FAE5] transition duration-75 group-hover:text-[#065F46] " />
                <span className="flex-1 ms-3 whitespace-nowrap">Low</span>

                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {filteredNumber("Low")}
                </span>
              </li>
            </Link>
          </ul>
        </div>
      </aside>
    </>
  );
}
