import classes from "../styles/Error.module.css";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <section className={classes["error"]}>
      <img
        src="https://redux-toolkit-jobster.netlify.app/static/media/not-found.5cfa24fa5e3ca7dffe02f358358ea9df.svg"
        alt="page not found"
      />
      <h3>Ohh! Page Not Found</h3>
      <p>We can't seem to find the page you're looking for</p>
      <Link to="/">back home</Link>
    </section>
  );
}
