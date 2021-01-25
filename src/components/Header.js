import logo from "../logo.svg";
import "../App.css";
import { useState } from "react";
import { useForm } from "./useForm";

export const Header = (props) => {
  const [nameError, setNameError] = useState("");
  const [values, handleChange] = useForm({
    name: "",
  });

  const validate = () => {
    if (!values.name) {
      setNameError("enter name");
      return false;
    }

    if (values.name.length < 2) {
      setNameError("min. char length is 3");
      return false;
    }
    return true;
  };

  const handleProceed = () => {
    const isValid = validate();
    if (isValid) {
      props.onChange(values.name, false);
    }
  };

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input
          name="name"
          value={values.name}
          className="normal-text-field"
          placeholder="Enter your name"
          onChange={handleChange}
        ></input>
        {nameError ? <div className="error">{nameError}</div> : null}
        <button className="button" onClick={() => handleProceed()}>
          Proceed
        </button>
      </header>
    </div>
  );
};
