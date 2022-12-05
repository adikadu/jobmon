import classes from "../../styles/dashboard/AllJobs.module.css";
import { useOutletContext } from "react-router-dom";
import FormRow from "../generalComponents/FormRow";
import Job from "../generalComponents/Job";
import Loading from "../generalComponents/Loading";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { getAllJobs, allJobsActions } from "../../store/store";
import moment from "moment/moment";

let timeout;

export default function AllJobs() {
  const { sidebarAction, windowWidth } = useOutletContext();

  const dispatch = useDispatch();
  const allJobs = useSelector((state) => state.allJobs);
  const timerFunction = useCallback(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(getAllJobs());
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    timerFunction();
  }, [
    timerFunction,
    allJobs.search,
    allJobs.searchStatus,
    allJobs.searchType,
    allJobs.sort,
    allJobs.page,
  ]);

  const paginationPrevBtnHandler = (event) => {
    let updatedPage = 1;
    if (allJobs.page === 1) updatedPage = allJobs.numOfPages;
    else updatedPage = allJobs.page - 1;
    return dispatch(allJobsActions.changePage(updatedPage));
  };
  const paginationNextBtnHandler = (event) => {
    let updatedPage = 1;
    if (allJobs.page === allJobs.numOfPages) updatedPage = 1;
    else updatedPage = allJobs.page + 1;
    return dispatch(allJobsActions.changePage(updatedPage));
  };

  let displayJobs;
  if (!allJobs.isLoading && !allJobs.jobs.length)
    displayJobs = <h1>No jobs to display...</h1>;
  else if (!allJobs.isLoading && allJobs.jobs.length)
    displayJobs = (
      <>
        <div className={classes["job-list"]}>
          <p>
            {allJobs.totalJobs} Job{allJobs.totalJobs > 1 ? "s" : ""} Found
          </p>
          <div className={classes["jobs"]}>
            {allJobs.jobs.map((job) => (
              <Job
                key={job._id}
                jobId={job._id}
                position={job.position}
                company={job.company}
                jobLocation={job.jobLocation}
                jobType={job.jobType}
                createdAt={moment(job.createdAt).format("MMM Do, YYYY")}
                status={job.status}
              />
            ))}
          </div>
        </div>
        {allJobs.numOfPages > 1 && (
          <div className={classes["pagination"]}>
            <button onClick={paginationPrevBtnHandler}>
              <HiChevronDoubleLeft /> Prev
            </button>
            <div className={classes["page-no"]}>
              {Array.from({ length: allJobs.numOfPages }, (_, i) => i + 1).map(
                (page) => (
                  <span
                    key={page}
                    className={
                      allJobs.page === page ? classes["curr-page"] : ""
                    }
                    onClick={() => dispatch(allJobsActions.changePage(page))}
                  >
                    {page}
                  </span>
                )
              )}
            </div>
            <button onClick={paginationNextBtnHandler}>
              Next <HiChevronDoubleRight />
            </button>
          </div>
        )}
      </>
    );

  return (
    <section
      style={{
        gridRow: "1/2",
        gridColumn: windowWidth || sidebarAction ? "1/3" : "2/3",
      }}
    >
      <div className={classes["main-content"]}>
        <div className={classes["search-form"]}>
          <h3>Search Form</h3>
          <form
            className={classes["form"]}
            onSubmit={(e) => e.preventDefault()}
          >
            <FormRow
              name="search"
              type="text"
              value={allJobs.search}
              setValue={allJobsActions.updateSearch}
            />
            <FormRow
              name="status"
              type="select"
              options={["all", "interview", "declined", "pending"]}
              value={allJobs.searchStatus}
              setValue={allJobsActions.updateSearchStatus}
            />
            <FormRow
              name="type"
              type="select"
              options={["full-time", "part-time", "remote", "internship"]}
              value={allJobs.searchType}
              setValue={allJobsActions.updateSearchType}
            />
            <FormRow
              name="sort"
              type="select"
              options={["latest", "oldest", "a-z", "z-a"]}
              value={allJobs.sort}
              setValue={allJobsActions.updateSort}
            />
            <button
              onClick={() => dispatch(allJobsActions.resetToInitialState())}
              type="reset"
              className={`btn ${classes["btn--clear"]}`}
            >
              Clear Filters
            </button>
          </form>
        </div>
        {allJobs.isLoading && <Loading />}
        {displayJobs}
      </div>
    </section>
  );
}
