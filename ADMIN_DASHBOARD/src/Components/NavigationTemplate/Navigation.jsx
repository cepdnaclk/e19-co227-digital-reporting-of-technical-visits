import Nav from "../NaviconTemplate/Nav";
import "./Navigation.css";

const Navigation = () => {
  return (
    <div className="navigation">
      <header>
        <div className="profile">
          <img src="/logo.jpg" alt="user-img" className="profile-img" />
        </div>
        <span></span>
      </header>
      <Nav />
    </div>
  );
};

export default Navigation;
