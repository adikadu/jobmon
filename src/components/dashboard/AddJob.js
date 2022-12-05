import classes from "../../styles/dashboard/AddJob.module.css";
import { useOutletContext } from "react-router-dom";
import FormRow from "../generalComponents/FormRow";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addJob, editJob } from "../../store/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddJob() {
  const { sidebarAction, windowWidth } = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobState = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.user);
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [jobLocation, setJobLocation] = useState(user.location);
  const [status, setStatus] = useState("pending");
  const [jobType, setJobType] = useState("full-time");

  useEffect(() => {
    if (!jobState.isEditing) return;
    setPosition(jobState.position);
    setCompany(jobState.company);
    setJobLocation(jobState.jobLocation);
    setStatus(jobState.status);
    setJobType(jobState.jobType);
  }, [
    jobState.isEditing,
    jobState.position,
    jobState.company,
    jobState.jobLocation,
    jobState.status,
    jobState.jobType,
    setPosition,
    setCompany,
    setJobLocation,
    setStatus,
    setJobType,
  ]);

  const clearBtnHandler = () => {
    setPosition("");
    setCompany("");
    setJobLocation(user.location);
    setStatus("pending");
    setJobType("full-time");
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please enter all the fields!");
      return;
    }
    if (jobState.isEditing) {
      dispatch(
        editJob({
          jobId: jobState.editJobId,
          position,
          company,
          jobLocation,
          status,
          jobType,
        })
      );
      setTimeout(() => navigate("/all-jobs"), 500);
    } else
      dispatch(addJob({ position, company, jobLocation, status, jobType }));
    clearBtnHandler();
  };
  return (
    <section
      style={{
        gridRow: "1/2",
        gridColumn: windowWidth || sidebarAction ? "1/3" : "2/3",
      }}
    >
      <div className={classes["main-content"]}>
        <h3>add job</h3>
        <form onSubmit={formSubmitHandler} className={classes["form"]}>
          <FormRow
            name="position"
            type="text"
            value={position}
            setValue={setPosition}
            doDispatch={false}
          />
          <FormRow
            name="company"
            type="text"
            value={company}
            setValue={setCompany}
            doDispatch={false}
          />
          <FormRow
            name="job location"
            type="text"
            value={jobLocation}
            setValue={setJobLocation}
            doDispatch={false}
          />
          <FormRow
            name="status"
            type="select"
            options={["interview", "declined", "pending"]}
            value={status}
            setValue={setStatus}
            doDispatch={false}
          />
          <FormRow
            name="job type"
            type="select"
            options={["full-time", "part-time", "remote", "internship"]}
            value={jobType}
            setValue={setJobType}
            doDispatch={false}
          />
          <div className={classes["btns"]}>
            <button
              onClick={clearBtnHandler}
              type="reset"
              className={`btn ${classes["btn--clear"]}`}
            >
              Clear
            </button>
            <button
              type="submit"
              className={"btn"}
              disabled={jobState.isLoading}
            >
              {jobState.isLoading ? "adding job..." : "submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
