import { ReactComponent as NavbarLogo } from "../../assets/navbar-logo.svg";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Navbar.module.scss";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const minWidthWindowSizeMobileTransition = 560
const maxWidthWindowSizeMobileTransition = 640

const Navbar = () => {
  const [isHamburgerClicked, setClicked] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false); 


  useEffect(() => {
    function resizeListener() {
      const { innerWidth: width }: { innerWidth: number } = window;

      if (width >= minWidthWindowSizeMobileTransition && width <= maxWidthWindowSizeMobileTransition && isHamburgerClicked) {
        setDisableTransition(true);
        setTimeout(function () {
          setDisableTransition(false);
        }, 1000);
      }

      if (width > 990) {
        setClicked(false);
      }
    }

    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, [isHamburgerClicked]);

  var navbarStyle = `${styles.nav__navbar}`;

  if (disableTransition) {
    navbarStyle = `${styles.nav__navbar} ${styles["nav__menu--visibility"]} ${styles["nav__menu--notransition"]}`;
  } else if (isHamburgerClicked) {
    navbarStyle = `${styles.nav__navbar} ${styles["nav__menu--visibility"]}`;
  } 

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__header}>
        <a href="/#" className={styles.nav__logo}>
          <NavbarLogo />
        </a>
        <a href="/#">Wizualizacja danych</a>
      </div>

      <ul className={navbarStyle}>
        <li>
          <a href="/#"> Pokaż wszystkie dane </a>
        </li>
        <li>
          <a href="/#"> Dodaj dane </a>
        </li>
      </ul>

      <div
        className={`${styles["nav__hamburger-icon"]}`}
        onClick={() => {
          setClicked(!isHamburgerClicked);
        }}
      >
        <FontAwesomeIcon icon={isHamburgerClicked ? faXmark : faBars} />
      </div>
    </nav>
  );
};

export default Navbar;
