import React from "react";

const Signup = ({ renderInput, handleSubmit, onChange, gender }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {renderInput("username", "User Name")}
        {renderInput("email", "Email")}
        {renderInput("password", "Password", "password")}
        {renderInput("phone", "Phone")}
        {renderInput("firstname", "First Name")}
        {renderInput("lastname", "Last Name")}
        {renderInput("location", "Location")}

        <div className="form-group col-md-4" >
          <label for="gender">Gender</label>
          <select id="gender" className="form-control" name="gender" value={gender} onChange={onChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button className="btn btn-primary"> SignUp </button>
      </form>
    </div>
  );
};

export default Signup;