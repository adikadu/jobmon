import classes from "../../styles/generalComponents/FormRow.module.css";
import { useDispatch } from "react-redux";

export default function FormRow({
  name,
  type,
  options,
  value,
  setValue,
  doDispatch,
}) {
  const dispatch = useDispatch();
  if (doDispatch === undefined) doDispatch = true;

  const inputOnChangeHandler = (e) => {
    if (doDispatch) dispatch(setValue(e.target.value));
    else setValue(e.target.value);
  };

  const selectOnChangeHandler = (e) => {
    if (doDispatch) dispatch(setValue(e.target.selectedOptions[0].value));
    else setValue(e.target.selectedOptions[0].value);
  };

  if (type === "select")
    return (
      <div className={classes["form-row"]}>
        <label htmlFor={name}>{name}</label>
        <select
          name={name}
          id={name}
          className={classes["form-select"]}
          onChange={selectOnChangeHandler}
          defaultValue={value}
        >
          {options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );

  return (
    <div className={classes["form-row"]}>
      <label htmlFor={name}>{name}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={inputOnChangeHandler}
      />
    </div>
  );
}
