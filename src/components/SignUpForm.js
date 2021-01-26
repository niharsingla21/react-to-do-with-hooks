import { useForm } from "./useForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const initialErrorState = {
  emailError: null,
  dateError: null,
  addressError: null,
  mobileError: null,
};
export const SignUpForm = (props) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [errors, setErrors] = useState(initialErrorState);

  const [values, handleChange] = useForm({
    name: props.name,
    email: "",
    title: "Mr.",
    gender: "Male",
    address: "",
    mobile: "",
  });

  const validate = () => {
    if (!values.email) {
      setErrors({ emailError: "Enter email address" });
    }

    if (values.email) {
      if (!values.email.includes("@")) {
        setErrors({ emailError: "Invalid email" });
      }
    }
    console.log(errors);
    if (!selectedDate) {
      setErrors((errors) => ({ ...errors, dateError: "Enter your DOB" }));
      console.log(errors);
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

    if (
      errors.emailError === null &&
      errors.addressError === null &&
      errors.dateError === null &&
      errors.mobileError === null
    ) {
      return true;
    }
    return false;
  };

  function onSubmit(event) {
    event.preventDefault();
    setErrors(initialErrorState);
    const isValid = validate();
    console.log(isValid);
    if (isValid) {
      setErrors(initialErrorState);
      props.getFormData(values, false, selectedDate);
    }
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
            name="dob"
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
    </div>
  );
};
