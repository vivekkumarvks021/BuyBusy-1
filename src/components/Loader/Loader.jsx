import { ClipLoader } from "react-spinners";

import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <ClipLoader size={50} color="#2563eb" />
    </div>
  );
}

export default Loader;
