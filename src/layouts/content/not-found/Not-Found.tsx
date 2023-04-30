import { useTranslation } from "react-i18next";
import styles from "./Not-Found.module.scss"

const NotFound = () => {
  const [t] = useTranslation()

  return <h1 className={styles["title"]}>404 {t("notFound")}</h1>
};

export default NotFound;
