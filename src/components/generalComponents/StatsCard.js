import classes from "../../styles/generalComponents/StatsCard.module.css";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";

export default function StatsCard({ status, value }) {
  let statusType = "pending applications";
  if (status === "interview") statusType = "interviews scheduled";
  else if (status === "declined") statusType = "jobs declined";

  let statusIcon = <FaSuitcaseRolling />;
  if (status === "interview") statusIcon = <FaCalendarCheck />;
  else if (status === "declined") statusIcon = <FaBug />;

  return (
    <div className={`${classes["stats-card"]} ${classes[status]}`}>
      <div className={classes["num"]}>
        <span>{value}</span>
        <div className={classes["icon"]}>{statusIcon}</div>
      </div>
      <p>{statusType}</p>
    </div>
  );
}
