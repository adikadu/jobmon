import classes from "../../styles/dashboard/Sidebar.module.css";

import { NavLink } from "react-router-dom";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile, ImCross } from "react-icons/im";

export default function Sidebar({
  sidebarAction,
  setSidebarAction,
  windowWidth,
}) {
  const navLinksListHandler = (event) => {
    const nearestLi = event.target.closest("li");
    if (!nearestLi) return;
    setSidebarAction(false);
  };

  const navLinksList = (
    <ul onClick={navLinksListHandler}>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? classes["link-active"] : undefined
          }
        >
          <IoBarChartSharp />
          <span>Stats</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-jobs"
          className={({ isActive }) =>
            isActive ? classes["link-active"] : undefined
          }
        >
          <MdQueryStats />
          <span>all jobs</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-job"
          className={({ isActive }) =>
            isActive ? classes["link-active"] : undefined
          }
        >
          <FaWpforms />
          <span>add job</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? classes["link-active"] : undefined
          }
        >
          <ImProfile />
          <span>Profile</span>
        </NavLink>
      </li>
    </ul>
  );
  if (!windowWidth) {
    return (
      <div
        className={`${classes["sidebar"]} ${
          sidebarAction ? classes["translate-left"] : ""
        }`}
        style={{
          gridColumn: sidebarAction ? "1/1" : "1/2",
        }}
      >
        {navLinksList}
      </div>
    );
  }

  return (
    <div
      className={classes["big-sidebar"]}
      style={{ display: sidebarAction ? "block" : "none" }}
    >
      <div className={classes["backdrop"]}></div>
      <div className={classes["main-content"]}>
        <button
          className={classes["btn--close"]}
          onClick={() => setSidebarAction(false)}
        >
          <ImCross />
        </button>
        <img
          src="https://redux-toolkit-jobster.netlify.app/static/media/logo.35bb8e1d9b5745af32ff148cbee51dfa.svg"
          alt="jobmon logo"
        />
        <div className={classes["align--center"]} onClick={navLinksListHandler}>
          {navLinksList}
        </div>
      </div>
    </div>
  );
}
