export const ShowDetails = (props) => {
  function handlePageChange() {
    props.hide(false);
  }

  return (
    <div className="App-header">
      <div>
        <textarea
          readOnly
          className="big-text-area"
          value={
            "Hi " +
            props.data.name +
            ", " +
            " \nYour sign up is complete. Details registered with us are mentioned below:" +
            "\nEmail: " +
            props.data.email +
            "\nMobile: " +
            props.data.mobile +
            "\nDOB: " +
            props.dob +
            "\nGender: " +
            props.data.gender
          }
        ></textarea>
      </div>
      <div>
        <button onClick={handlePageChange}>Go back to Welcome Page</button>
      </div>
    </div>
  );
};
