import styles from "../../Styles/Navigation/NavItem.module.scss";

const NavItem = ({ Icon, title }) => {
  return (
    <div className={styles.nav}>
      {Icon && <Icon className={styles.icon} />}
      <h2>{title ? title : null}</h2>
    </div>
  );
};

export default NavItem;
