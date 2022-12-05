import classes from "../../styles/generalComponents/Card.module.css";
import React from "react";

export default function Card(props) {
  return (
    <div className={classes["card"]}>
      <div
        className={`${classes["top-line"]} ${
          props.animate ? classes["animate"] : ""
        } ${classes[props.toplineColor]}`}
      ></div>
      {props.children}
    </div>
  );
}
