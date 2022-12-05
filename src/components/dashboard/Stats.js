import classes from "../../styles/dashboard/Stats.module.css";
import { useOutletContext } from "react-router-dom";
import StatsCard from "../generalComponents/StatsCard";
import { showStats } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AreaChartContainer from "../charts/AreaChartContainer";
import BarChartContainer from "../charts/BarChartContainer";

export default function Stats() {
  const { sidebarAction, windowWidth } = useOutletContext();
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.allJobs.stats);
  const monthlyApplications = useSelector(
    (state) => state.allJobs.monthlyApplications
  );
  const [isAreaChart, setIsAreaChart] = useState(true);
  useEffect(() => {
    dispatch(showStats());
  }, [dispatch]);

  return (
    <section
      style={{
        gridRow: "1/2",
        gridColumn: windowWidth || sidebarAction ? "1/3" : "2/3",
      }}
      className={classes["stats"]}
    >
      <div className={classes["cards"]}>
        <StatsCard status="pending" value={stats["pending"]} />
        <StatsCard status="interview" value={stats["interview"]} />
        <StatsCard status="declined" value={stats["declined"]} />
      </div>
      <div className={classes["graph-container"]}>
        <p>monthly applications</p>
        <button
          className={classes["btn-toggle-graph"]}
          onClick={() => setIsAreaChart((prev) => !prev)}
        >
          {isAreaChart ? "area chart" : "bar chart"}
        </button>
        {isAreaChart ? (
          <AreaChartContainer data={monthlyApplications} />
        ) : (
          <BarChartContainer data={monthlyApplications} />
        )}
      </div>
    </section>
  );
}
