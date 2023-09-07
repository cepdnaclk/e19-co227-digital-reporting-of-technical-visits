import "./App.scss";
import { Login } from "./Pages/Login";
import { Navigation } from "./Components/NavigationTemplate/Navigation";
import { Routes, Route } from "react-router-dom";
import { Clients } from "./Pages/Clients";
import { Dashboard } from "./Pages/Dashboard";
import { Tasks } from "./Pages/Tasks";
import { TechnicianAssign } from "./Pages/TechnicianAssign";
import { Technician } from "./Pages/Technicians";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/n" element={<Navigation />} />

        {/*Main />*/}
        <Route path="/" element={<Login />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/techassign" element={<TechnicianAssign />} />
        <Route path="/tech" element={<Technician />} />
      </Routes>
    </div>
  );
}

export default App;
