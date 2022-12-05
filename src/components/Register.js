import classes from "../styles/Register.module.css";
import Card from "./generalComponents/Card";
import { useEffect, useState } from "react";
import FormRow from "./generalComponents/FormRow";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [doRegister, setDoRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password || (doRegister && !name))
      toast.error("please enter all the fields!");
    if (doRegister) dispatch(registerUser({ email, password, name }));
    else dispatch(loginUser({ email, password }));
    setEmail("");
    setPassword("");
    setName("");
  };

  const demoOnClickHandler = async (e) => {
    dispatch(loginUser({ email: "testUser@test.com", password: "secret" }));
  };
  return (
    <div className={classes["outer"]}>
      <Card animate={false} toplineColor="blue">
        <div className={classes["register-form"]}>
          <img
            src="https://redux-toolkit-jobster.netlify.app/static/media/logo.35bb8e1d9b5745af32ff148cbee51dfa.svg"
            alt="logo"
          />
          <h3>{doRegister ? "Register" : "Login"}</h3>
          <form className={classes["form"]} onSubmit={formSubmitHandler}>
            {doRegister && (
              <FormRow
                name="name"
                type="text"
                value={name}
                setValue={setName}
              />
            )}
            <FormRow
              name="email"
              type="email"
              value={email}
              setValue={setEmail}
            />
            <FormRow
              name="password"
              type="password"
              value={password}
              setValue={setPassword}
            />
            <button className="btn" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
          <button
            className={`btn ${classes["btn-demo-app"]}`}
            disabled={isLoading}
            onClick={demoOnClickHandler}
          >
            {isLoading ? "Loading..." : "Demo App"}
          </button>
          <p>
            {!doRegister ? "Not a member yet?" : "Already a member?"}{" "}
            <span onClick={() => setDoRegister((prev) => !prev)}>
              {doRegister ? "Login" : "Register"}
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}
