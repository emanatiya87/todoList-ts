import "./App.css";
import { Routes, Route } from "react-router-dom";
import FormAdding from "./components/addingForm";
import List from "./components/list";
import FormEditing from "./components/FormEditing";
import Notfound from "./components/Notfound";
import ResponsiveSidebar from "./components/sidebar";
import useTodoStore from "./store/todoStore";
function App() {
  const isOpen = useTodoStore((state) => state.isOpenMenu);
  return (
    <>
      <ResponsiveSidebar />
      <div className={`p-4  flex-1  ${isOpen ? "sm:ml-64" : "sm:ml-1.5"} `}>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/addTask" element={<FormAdding />} />
          <Route path="/edit/:id" element={<FormEditing />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
