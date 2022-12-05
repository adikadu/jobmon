import classes from "../../styles/dashboard/SharedLayout.module.css";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function SharedLayout() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [sidebarAction, setSidebarAction] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth <= 900);

  useEffect(() => {
    if (!user) navigate("landing", { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setWindowWidth(window.innerWidth <= 900)
    );
  }, []);

  if (!user) return;

  return (
    <section className={classes["shared-layout"]}>
      <Navbar
        sidebarAction={sidebarAction}
        setSidebarAction={setSidebarAction}
        windowWidth={windowWidth}
      />
      <div className={classes["disp-grid"]}>
        <Sidebar
          sidebarAction={sidebarAction}
          setSidebarAction={setSidebarAction}
          windowWidth={windowWidth}
        />
        <Outlet
          context={{ sidebarAction: sidebarAction, windowWidth: windowWidth }}
        />
      </div>
    </section>
  );
}
