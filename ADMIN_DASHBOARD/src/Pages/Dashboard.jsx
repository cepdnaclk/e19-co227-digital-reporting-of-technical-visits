import { Navigation } from "../Components/NavigationTemplate/Navigation";
import UserCard from "../Components/UserCard";

export const Dashboard = () => {
  return (
    <div>
      <p>Dashboard Page</p>
      <Navigation />
      <UserCard />
    </div>
  );
};
