import { Navigation } from "../Components/Navigation/Navigation";
import UserCard from "../Components/UserCard";
import "../Styles/Dashboard.scss";

export const Dashboard = () => {
  return (
    <div>
      <div className="container">
        <Navigation />
        <UserCard />
        <div className="component-container">
          <div className="name">
            <p>Dashboard Page</p>
          </div>
        </div>
      </div>
    </div>
  );
};
