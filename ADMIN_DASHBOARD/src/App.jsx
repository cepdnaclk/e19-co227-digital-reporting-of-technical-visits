import "./App.scss";
import { Login } from "./Pages/Login";
import { Routes, Route } from "react-router-dom";
import { Clients } from "./Pages/Clients";
import { Dashboard } from "./Pages/Dashboard";
import { Tasks } from "./Pages/Tasks";
import { TechnicianAssign } from "./Pages/TechnicianAssign";
import { Technician } from "./Pages/Technicians";
import { Settings } from "./Pages/Settings";
import { DataContextProvider } from "./Context/dataContext";

function App() {
  return (
    <div className="App">
      <DataContextProvider>
        <Routes>
          {/*Main />*/}
          <Route path="/" element={<Login />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/techassign" element={<TechnicianAssign />} />
          <Route path="/tech" element={<Technician />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </DataContextProvider>
    </div>
  );
}

export default App;
