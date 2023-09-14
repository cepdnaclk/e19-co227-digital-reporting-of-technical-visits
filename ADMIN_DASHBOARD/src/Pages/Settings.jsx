import { Navigation } from "../Components/Navigation/Navigation";
import { TaskForm } from "../Components/Tasks/TaskForm";
import UserCard from "../Components/UserCard";
import "../Styles/Dashboard.scss";

export const Settings = () => {
  return (
    <div>
      <div className="container">
        <Navigation />
        <UserCard />
        
        <div className="component-container">
          <div className="name">
            <p>Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};
