import classes from "../../styles/generalComponents/Job.module.css";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteJob, jobActions } from "../../store/store";
import { useNavigate } from "react-router-dom";

export default function Job({
  jobId,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editBtnClickHandler = () => {
    dispatch(
      jobActions.editJob({
        jobId,
        position,
        company,
        jobLocation,
        status,
        jobType,
      })
    );
    navigate("/add-job");
  };

  return (
    <div className={classes["job"]}>
      <div className={classes["top-details"]}>
        <p className={classes["logo"]}>{company[0]}</p>
        <div className={classes["pos-comp"]}>
          <p>{position}</p>
          <span>{company}</span>
        </div>
      </div>
      <div className={classes["other-details"]}>
        <span>
          <FaLocationArrow />
          {jobLocation}
        </span>
        <span>
          <FaCalendarAlt />
          {createdAt}
        </span>
        <span>
          <FaBriefcase />
          {jobType}
        </span>
        <span
          className={`${classes["status"]} ${classes[status.toLowerCase()]}`}
        >
          {status}
        </span>
      </div>
      <div className={classes["btns"]}>
        <button className={classes["btn--edit"]} onClick={editBtnClickHandler}>
          Edit
        </button>
        <button
          className={classes["btn--delete"]}
          onClick={() => {
            dispatch(deleteJob(jobId));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
