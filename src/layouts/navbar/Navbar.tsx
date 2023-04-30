import { ReactComponent as NavbarLogo } from "../../assets/navbar-logo.svg";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Navbar.module.scss";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import Language from "../../enums/Language";

const minWidthWindowSizeMobileTransition = 560;
const maxWidthWindowSizeMobileTransition = 640;

const Navbar = () => {
  const [t, i18n] = useTranslation();

  const languageOptions = [
    { value: Language.en, label: t("navbar.languageOption.en") },
    { value: Language.pl, label: t("navbar.languageOption.pl") },
  ];

  const indexOfLastPickedLanguage = languageOptions
    .map((e) => e.value)
    .indexOf(Language[i18n.language as keyof typeof Language]);

  const [isHamburgerClicked, setClicked] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);

  useEffect(() => {
    function resizeListener() {
      const { innerWidth: width }: { innerWidth: number } = window;

      if (
        width >= minWidthWindowSizeMobileTransition &&
        width <= maxWidthWindowSizeMobileTransition &&
        isHamburgerClicked
      ) {
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

  function changeLanguage(selectedOption: any) {
    i18n.changeLanguage(Language[selectedOption.value]);
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__header}>
        <Link to="/main" className={styles.nav__logo}>
          <NavbarLogo />
        </Link>
        <Link to="/main">{t("navbar.title")}</Link>
      </div>

      <ul className={navbarStyle}>
        <li>
          <a href="/views">{t("navbar.showAllDataMenu")} </a>
        </li>
        <Select
          className="language-selector-container"
          classNamePrefix="language-selector"
          styles={{
            control: (base) => ({
              ...base,
              boxShadow: "none",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
              },
            }),
            option: (base) => ({
              ...base,
              backgroundColor: "white",
              color: "black",

              "&:hover": {
                backgroundColor: "#cbe4de",
                color: "black",
              },
            }),
          }}
          defaultValue={languageOptions[indexOfLastPickedLanguage]}
          value={languageOptions[indexOfLastPickedLanguage]}
          onChange={changeLanguage}
          name="language"
          options={languageOptions}
        />
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
