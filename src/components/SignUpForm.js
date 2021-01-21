import { useForm } from "./useForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export const SignUpForm = (props) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [hideTextArea, setHideTextArea] = useState(true);
  const [errors, setErrors] = useState({
    emailError: "",
    dateError: "",
    addressError: "",
    mobileError: "",
  });

  const [values, handleChange] = useForm({
    name: props.name,
    email: "",
    title: "Mr.",
    gender: "Male",
    address: "",
    mobile: "",
    dob: selectedDate,
  });

  const validate = () => {
    if (!values.email) {
      setErrors(() => ({ emailError: "Enter email address" }));
    }
    if (values.email) {
      if (!values.email.includes("@")) {
        setErrors((errors) => ({ ...errors, emailError: "Invalid email" }));
      }
    }
    if (!selectedDate) {
      setErrors((errors) => ({ ...errors, dateError: "Enter your DOB" }));
    }
    if (values.mobile.length < 10 && values.mobile.length === 0) {
      setErrors((errors) => ({
        ...errors,
        mobileError: "Enter valid mobile number",
      }));
    }
    if (!values.address) {
      setErrors((errors) => ({
        ...errors,
        addressError: "Enter your address",
      }));
    }
    if (values.address) {
      if (values.address.length < 10) {
        setErrors((errors) => ({
          ...errors,
          addressError: "Min. address length is 10",
        }));
      }
    }

    if (!Object.entries(errors)) {
      return false;
    }
    return true;
  };

  function onSubmit(event) {
    event.preventDefault();
    setErrors({});
    const isValid = validate();
    if (isValid) {
      setHideTextArea(false);
    }
  }

  function handlePageChange() {
    setHideTextArea(true);
    props.getFormData(values, false);
  }

  return (
    <div className="App-header">
      <h1>Please fill the form to complete sign up</h1>
      <form className="form-style" onSubmit={(event) => onSubmit(event)}>
        <div>
          <select
            className="normal-text-field"
            name="title"
            value={values.title}
            onChange={handleChange}
          >
            <option>Mr.</option>
            <option>Ms.</option>
            <option>Mrs.</option>
          </select>
        </div>
        <div>
          <input
            value={props.name}
            className="normal-text-field"
            name="name"
            disabled
          ></input>
        </div>
        <div>
          <input
            name="email"
            className="normal-text-field"
            placeholder="Enter your email"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <i className="error">{errors.emailError}</i>
        </div>
        <div>
          <select
            name="gender"
            className="normal-text-field"
            placeholder="Gender"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Transgender</option>
          </select>
        </div>
        <div>
          <DatePicker
            className="date-picker"
            name="selectedDate"
            selected={selectedDate}
            showYearDropdown
            showMonthDropdown
            isClearable
            maxDate={new Date()}
            dateFormat={"dd MMM yyyy"}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Date of Birth"
          />
        </div>
        <div>
          <i className="error">{errors.dateError}</i>
        </div>
        <div>
          <input
            name="mobile"
            type="tel"
            className="normal-text-field"
            placeholder="Mobile number"
            maxLength={10}
            minLength={10}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <i className="error">{errors.mobileError}</i>
        </div>
        <div>
          <textarea
            name="address"
            className="text-area-field"
            placeholder="Address"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <i className="error">{errors.addressError}</i>
        </div>
        <div>
          <button type="submit" onClick={(event) => onSubmit(event)}>
            Submit
          </button>
        </div>
      </form>
      <div hidden={hideTextArea}>
        <div>
          <textarea
            readOnly
            className="text-area-field"
            value={
              "Hi " +
              values.name +
              ", " +
              " \nYour sign up is complete. Details registered with us are mentione below:" +
              "\nEmail: " +
              values.email +
              "\nMobile: " +
              values.mobile +
              "\nDOB: " +
              selectedDate +
              "\nGender: " +
              values.gender
            }
          ></textarea>
        </div>
        <div>
          <button onClick={handlePageChange}>Go back to Welcome Page</button>
        </div>
      </div>
    </div>
  );
};
