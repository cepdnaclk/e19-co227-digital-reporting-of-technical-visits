import { Navigation } from "../Components/NavigationTemplate/Navigation";
import UserCard from "../Components/UserCard";
import "../Styles/Clients.scss";

export const TechnicianAssign = () => {
  return (
    <div>
      <div className="container">
        <Navigation />
        <UserCard />
        <div className="name">
          <p>Technician Assign Page</p>
        </div>
      </div>
    </div>
  );
};
