import "./App.css";
import { Routes, Route } from "react-router-dom";
import FormAdding from "./components/addingForm";
import Nav from "./components/nav";
import List from "./components/list";
import FormEditing from "./components/FormEditing";
import Notfound from "./components/Notfound";
function App() {
  return (
    <>
      <Nav />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/addTask" element={<FormAdding />} />
        <Route path="/edit/:id" element={<FormEditing />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
