import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { ShowDetails } from "./components/ShowDetails";
import { SignUpForm } from "./components/SignUpForm";

function App() {
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showHeader, setShowHeader] = useState(true);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [values, setValues] = useState({});

  function captureName(name, showHeader) {
    setName(name);
    setShowHeader(showHeader);
    setShowSignUpForm(!showHeader);
  }

  function getFormData(values, showSignUpForm, selectedDate) {
    setValues(values);
    setSelectedDate(selectedDate);
    setShowSignUpForm(showSignUpForm);
    setShowDetails(!showSignUpForm);
  }

  return (
    <div className="App">
      {showHeader ? <Header onChange={captureName} /> : null}
      {showSignUpForm ? (
        <SignUpForm name={name} getFormData={getFormData} />
      ) : null}
      {showDetails ? (
        <ShowDetails
          data={values}
          hide={(value) => {
            setShowDetails(value);
            setShowHeader(!value);
          }}
          dob={selectedDate}
        />
      ) : null}
    </div>
  );
}

export default App;
