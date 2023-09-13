import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import "../Styles/Clients.scss";

export const TechnicianAssign = () => {
  return (
    <div>
      <div className="container">
        <Navigation />
        <UserCard />
        <div className="component-container">
          <div className="name">
            <p>Technician Assign</p>
          </div>
        </div>
      </div>
    </div>
  );
};
