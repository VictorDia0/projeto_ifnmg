import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"
const NavBar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.container1}>
        <div className={styles.container2}>
          <Link to="/adm">
            Home
          </Link>
          <Link to="/students">
            Estudantes
          </Link>
          <Link>
            Usuarios
          </Link>
          <Link>
            Refeições
          </Link>
          <Link to="/cadastrar">
            Cadastrar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
