import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../AppContext";
import { useHistory } from "react-router-dom";

const CreateUser = () => {
  let history = useHistory();

  const [error, displayError] = useState(false);


  const { context, setContext } = useContext(AppContext);
  const [validation, setValidation] = useState([]);

  const [toggleSignUp, setToggleSignUp] = useState(false);
  const [toggleSignIn, setToggleSignIn] = useState(true);
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });


 
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
      
        <div style={{ width: "70%", margin: "auto" }}>
          <p>
            New user{" "}
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => {
               history.push('users/add')
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
   
    

    
    </React.Fragment>
  );
};

export default CreateUser;
