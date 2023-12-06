import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/BackButton.module.css";

const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className={styles["backButton-container"]}>
      <button onClick={goBack} className={styles["backButton"]}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    </div>
  );
};

export default BackButton;
