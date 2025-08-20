// store/todoStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

// 1. Define the shape of a Task
export interface Task {
  id: string;
  title: string;
  body: string;
  isComplete: boolean;
  dueDate?: string;
  priorty: string;
}

// 2. Define the shape of the Store
interface TodoStore {
  allTasks: Task[];
  setAllTasks: (tasks: Task[]) => void;

  inputTasks: Task[];
  setInputTasks: (tasks: Task[]) => void;

  showToast: boolean;
  setShowToast: (value: boolean) => void;

  isOpenMenu: boolean;
  setIsOpenMenu: (value: boolean) => void;

  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  addTask: (
    title: string,
    body: string,
    dueDate?: string,
    priorty?: string
  ) => void;
}

// 3. Create the store with persist
const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      allTasks: [],
      setAllTasks: (tasks) => set({ allTasks: tasks }),

      inputTasks: [],
      setInputTasks: (tasks) => set({ inputTasks: tasks }),

      showToast: false,
      setShowToast: (value) => set({ showToast: value }),

      isOpenMenu: false,
      setIsOpenMenu: (value) => set({ isOpenMenu: value }),

      deleteTask: (id) =>
        set((state) => {
          const newTasks = state.inputTasks.filter((t) => t.id !== id);
          return {
            inputTasks: newTasks,
            allTasks: newTasks,
          };
        }),

      completeTask: (id) =>
        set((state) => {
          const updatedTasks = state.inputTasks.map((t) =>
            t.id === id ? { ...t, isComplete: !t.isComplete } : t
          );
          return {
            inputTasks: updatedTasks,
            allTasks: updatedTasks,
          };
        }),

      addTask: (title, body, dueDate, priorty) =>
        set((state) => {
          const newTask: Task = {
            id: uuidv4(),
            title,
            body,
            isComplete: false,
            dueDate,
            priorty,
          };
          const updatedTasks = [...state.inputTasks, newTask];
          return {
            inputTasks: updatedTasks,
            allTasks: updatedTasks,
          };
        }),
    }),
    {
      name: "todo-storage",
      partialize: (state) => ({ allTasks: state.allTasks }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Only at start: mirror allTasks into inputTasks
          state.setInputTasks(state.allTasks);
        }
      },
    }
  )
);

export default useTodoStore;
