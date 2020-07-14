import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../AppContext";
import { useHistory } from "react-router-dom";

const CreateUser = () => {
  let history = useHistory();

  const [error, displayError] = useState(false);
  const [msg1, dmsg1] = useState("");
  const [msg2, dmsg2] = useState("");
  const [msg3, dmsg3] = useState("");
  const [msg4, dmsg4] = useState("");

  const { context, setContext } = useContext(AppContext);
  const [validation, setValidation] = useState([]);
  const [signUp, setSignUp] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [toggleSignUp, setToggleSignUp] = useState(false);
  const [toggleSignIn, setToggleSignIn] = useState(true);
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUp({
      ...signUp,
      [name]: value,
    });
    dmsg1("");
    dmsg2("");
    dmsg3("");
    dmsg4("");
  };

  const handleSignUpubmit = (e) => {
    e.preventDefault();
    
    const firstname = signUp.firstname.toLowerCase();
    const lastname = signUp.lastname.toLowerCase();
    const email = signUp.email;
    const password = signUp.password;
    let flag = true;
    // check first name
    if (
      firstname.length < 3 ||
      firstname.length === "" ||
      firstname.length > 12
    ) {
      dmsg1("is not valid.");
      flag = false;
    }
    if (firstname) {
      let counter1 = 0;
      for (let i = 0; i < firstname.length; i++) {
        if (Number(`${firstname[i]}`)) {
          counter1++;
        }
      }
      if (counter1 > 0) {
        dmsg1("cannot contain a number.");
        flag = false;
      }
    }
    // check last name
    if (lastname.length < 3 || lastname.length === "" || lastname.length > 12) {
      dmsg2("is not valid.");
    }
    if (lastname) {
      let counter2 = 0;
      for (let i = 0; i < lastname.length; i++) {
        if (Number(`${lastname[i]}`)) {
          counter2++;
        }
      }
      if (counter2 > 0) {
        dmsg2("cannot contain a number.");
        flag = false;
      }
    }
    // check email
    if (email.length < 10 || email.length === "" || email.length > 25) {
      dmsg3("is not valid.");
    }
    if (email) {
      let counter3 = 0;
      let counter4 = 0;
      if (!email.includes("@")) {
        counter3++;
      }
      if (!email.includes(".")) {
        counter4++;
      }
      if (counter3 > 0) {
        dmsg3("is missing ('@').");
        flag = false;
      }
      if (counter4 > 0) {
        dmsg3("is missing ('.').");
        flag = false;
      }
    }
    // check password
    if (password.length < 6 || password.length === "" || password.length > 20) {
      dmsg4("is not valid.");
      flag = false;
    }
    if (password) {
      let counter5 = 0;
      let counter6 = 0;
      for (let i = 0; i < password.length; i++) {
        if (Number(`${password[i]}`)) {
          counter5++;
        }
        if (password.includes(" ")) {
          counter6++;
        }
      }
      if (counter5 === 0) {
        dmsg4("must contain at least one number.");
        flag = false;
      }
      if (counter6 > 0) {
        dmsg4("can not contain an empty space");
        flag = false;
      }
      if(counter5  === password.length){
        dmsg4("can not contain only numbers");
        flag = false;
      }
    }
    if (flag === true) {
      const user = {
        firstname,
        lastname,
        email,
        password,
      };
      setToggleSignIn(true)
      setToggleSignUp(false)
      history.push('/')
      axios
        .post("https://e-tracker-mern.herokuapp.com/users/add", user)
        .then((res) => console.log(res.data));
      return setSignUp({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
     
    }
  };
  const handleSignInChange = (e) => {
    displayError(false);
    const { name, value } = e.target;
    setSignIn({
      ...signIn,
      [name]: value,
    });
  };

  useEffect(() => {
    axios.get("https://e-tracker-mern.herokuapp.com/users/").then((res) => {
      setValidation(res.data)
      console.log(res.data);
    });
    return () => {
      console.log("cleared user list");
    };
  }, []);
  const handleSignInSubmit = (e) => {
    e.preventDefault();
   
    const email = signIn.email;
    const password = signIn.password;
  
  for(let i = 0; i < validation.length; i++){
    if (
      validation[i].email === email &&
      validation[i].password === password
    ) {
      displayError(false);
      setContext({
        userLogged: validation[i].firstname,
        isLogged: true,
      });
      history.push("/");
      setSignIn({
        email: "",
        password: "",
      });
     break;
    } else {
      displayError(true);
    }
  }
      
  };
  return (
    <React.Fragment>
      {toggleSignIn && (
        <div style={{ width: "70%", margin: "auto" }}>
          <p>
            New user{" "}
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => {
                setToggleSignIn(false);
                setToggleSignUp(true);
              }}
            >
              Sign up
            </button>{" "}
            now and enjoy Extremely's exercise tracker.
          </p>

          <h3>Sign in</h3>

          <form onSubmit={handleSignInSubmit} noValidate>
            <div className="form-group">
              Email:
              <input
                type="email"
                name="email"
                className="form-control"
                value={signIn.email}
                onChange={handleSignInChange}
              />
            </div>
            <div className="form-group">
              Password:
              <input
                type="password"
                name="password"
                className="form-control"
                value={signIn.password}
                onChange={handleSignInChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" value="Login" className="btn btn-primary" />
            </div>
            {error && <p className='text-danger'>The following values do not exist in our database.</p>}
          </form>
        </div>
      )}
      {toggleSignUp && (
        <div style={{ width: "70%", margin: "auto" }}>
          <p>
            Already a user just{" "}
            <button
              className="btn btn-sm btn-outline-warning"
              onClick={() => {
                setToggleSignIn(true);
                setToggleSignUp(false);
              }}
            >
              Sign in
            </button>{" "}
            now and enjoy Extremely's exercise tracker.
          </p>

          <h3>Create New User</h3>

          <form onSubmit={handleSignUpubmit} noValidate>
            <div className="form-group">
              Firstname:
              <input
                type="text"
                name="firstname"
                className="form-control"
                value={signUp.firstname}
                onChange={handleSignUpChange}
              />
              {msg1 ? <p className="text-danger">Firstname {msg1}</p> : ""}
            </div>
            <div className="form-group">
              Lastname:
              <input
                type="text"
                name="lastname"
                className="form-control"
                value={signUp.lastname}
                onChange={handleSignUpChange}
              />
              {msg2 ? <p className="text-danger">Lastname {msg2}</p> : ""}
            </div>
            <div className="form-group">
              Email:
              <input
                type="email"
                name="email"
                className="form-control"
                value={signUp.email}
                onChange={handleSignUpChange}
              />
              {msg3 ? <p className="text-danger">Email {msg3}</p> : ""}
            </div>
            <div className="form-group">
              Password:
              <input
                type="password"
                name="password"
                className="form-control"
                value={signUp.password}
                onChange={handleSignUpChange}
              />
              {msg4 ? <p className="text-danger">Password {msg4}</p> : ""}
            </div>
            <div className="form-group">
              <input type="submit" value="Create" className="btn btn-primary" />
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default CreateUser;
