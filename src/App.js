import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { SignUpForm } from "./components/SignUpForm";

function App() {
  const [name, setName] = useState("");
  const [showHeader, setShowHeader] = useState(true);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [values, setValues] = useState({});

  function captureName(name, showHeader) {
    setName(name);
    setShowHeader(showHeader);
    setShowSignUpForm(!showHeader);
  }

  function getFormData(values, showSignUpForm) {
    setValues(values);
    setShowSignUpForm(showSignUpForm);
    setShowHeader(!showSignUpForm);
  }

  return (
    <div className="App">
      {showHeader ? <Header onChange={captureName} /> : null}
      {showSignUpForm ? (
        <SignUpForm name={name} getFormData={getFormData} />
      ) : null}
    </div>
  );
}

export default App;
