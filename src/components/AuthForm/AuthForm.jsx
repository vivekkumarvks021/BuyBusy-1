import { Link } from "react-router-dom";

import styles from "./AuthForm.module.css";

function AuthForm({
  title,
  buttonText,
  footerText,
  footerLinkText,
  footerLink,
  children,
  onSubmit,
}) {
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>{title}</h2>

        {children}

        <button type="submit">{buttonText}</button>

        <p>
          {footerText} <Link to={footerLink}>{footerLinkText}</Link>
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
