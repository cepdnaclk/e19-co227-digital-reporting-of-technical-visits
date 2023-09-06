import "./Nav.css";

const Nav = ({ Icon, title }) => {
  return (
    <div className="nav">
      {Icon && <Icon classname="icon" />}
      <h2>{title ? title : null}</h2>
    </div>
  );
};

export default Nav;
