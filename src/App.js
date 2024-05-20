import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Common/Header";
import CreateEmpleado from "./components/empleado/CreateEmpleado";
import Home from './components/Layout/Home'
import EditEmpleado from "./components/empleado/EditEmpleado";
function App() {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>
          <Route path="/" element={<Home />} />

            <Route path="/create-user" element={<CreateEmpleado/>} />
            <Route path="/edit-user/:id" element={<EditEmpleado/>} />

          </Routes>
          
        </div>
      </header>
    </div>
  );
}
export default App;
