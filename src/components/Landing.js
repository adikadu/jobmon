import classes from "../styles/Landing.module.css";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className={classes["landing-page"]}>
      <img
        src="https://redux-toolkit-jobster.netlify.app/static/media/logo.35bb8e1d9b5745af32ff148cbee51dfa.svg"
        alt="logo"
      />
      <div className={classes["main-content"]}>
        <div className={classes["info-signup"]}>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Crucifix narwhal street art asymmetrical, humblebrag tote bag pop-up
            fixie raclette taxidermy craft beer. Brunch bitters synth, VHS
            crucifix heirloom meggings bicycle rights.
          </p>
          <Link to="/register">Login/Register</Link>
        </div>
        <img
          src="https://redux-toolkit-jobster.netlify.app/static/media/main.17b316de742b3a1202078c5ae18c8261.svg"
          alt="main"
        />
      </div>
    </section>
  );
}
