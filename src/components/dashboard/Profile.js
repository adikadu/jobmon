import classes from "../../styles/dashboard/Profile.module.css";
import { useOutletContext } from "react-router-dom";
import FormRow from "../generalComponents/FormRow";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../../store/store";
import { toast } from "react-toastify";

export default function Profile() {
  const dispatch = useDispatch();
  const { sidebarAction, windowWidth } = useOutletContext();
  const { isLoading, user } = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [location, setLocation] = useState(user.location);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!name || !lastName || !email || !location) {
      toast.error("Please provide all values!");
      return;
    }
    dispatch(updateUserProfile({ name, lastName, email, location }));
  };
  return (
    <section
      style={{
        gridRow: "1/2",
        gridColumn: windowWidth || sidebarAction ? "1/3" : "2/3",
      }}
    >
      <div className={classes["main-content"]}>
        <h3>profile</h3>
        <form onSubmit={formSubmitHandler} className={classes["form"]}>
          <FormRow name="name" type="text" value={name} setValue={setName} />
          <FormRow
            name="last name"
            type="text"
            value={lastName}
            setValue={setLastName}
          />
          <FormRow
            name="email"
            type="email"
            value={email}
            setValue={setEmail}
          />
          <FormRow
            name="location"
            type="text"
            value={location}
            setValue={setLocation}
          />
          <button
            className={`btn ${classes["btn--submit"]}`}
            disabled={isLoading}
          >
            {isLoading ? "updating..." : "save changes"}
          </button>
        </form>
      </div>
    </section>
  );
}
