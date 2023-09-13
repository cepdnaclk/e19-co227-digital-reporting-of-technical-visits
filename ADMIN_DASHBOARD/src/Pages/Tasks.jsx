import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import "../Styles/Tasks.scss";

export const Tasks = () => {
  return (
    <div>
      <div className="container">
        <Navigation />
        <UserCard />
        <div className="component-container">
          <div className="name">
            <p>Tasks Log</p>
          </div>
        </div>
      </div>
    </div>
  );
};
