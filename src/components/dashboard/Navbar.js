import classes from "../../styles/dashboard/Navbar.module.css";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/store";
import { useState } from "react";

export default function Navbar({
  sidebarAction,
  setSidebarAction,
  windowWidth,
}) {
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <div
      className={`${classes["navbar"]} ${
        sidebarAction ? classes["change-grid"] : ""
      }`}
    >
      <img
        src="https://redux-toolkit-jobster.netlify.app/static/media/logo.35bb8e1d9b5745af32ff148cbee51dfa.svg"
        alt="jobmon logo"
        className={sidebarAction ? classes["translate-left"] : ""}
      />
      <div
        className={classes["align"]}
        style={{
          justifySelf: windowWidth || sidebarAction ? "left" : "center",
        }}
      >
        <FaAlignLeft
          onClick={() => setSidebarAction((prev) => !prev)}
          className={classes["align"]}
        />
      </div>
      <span className={classes["heading"]}>Dashboard</span>
      <div className={classes["btns"]}>
        <button
          className={`btn ${classes["btn--user"]}`}
          onClick={() => setShowLogoutBtn((prev) => !prev)}
        >
          <FaUserCircle />
          <span>{user.name}</span>
          <FaCaretDown />
        </button>
        <button
          className={classes["btn--logout"]}
          onClick={() => dispatch(userActions.logoutUser())}
          style={{ display: showLogoutBtn ? "block" : "none" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
