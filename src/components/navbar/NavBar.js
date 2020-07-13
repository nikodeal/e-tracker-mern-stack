import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext";

const NavBar = () => {
  const { context ,setContext} = useContext(AppContext);
  return (
    <nav className="navbar navbar-expand-lg" style={{display: 'flex',flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'space-between',width: '100%'}}>
      <Link to="/" className="navbar-brand">
        E-Tracker
      </Link>
      <div className="collpase navbar-collpase">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/exercises" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="navbar-item">
            {context.isLogged === true ? <Link to="/create" className="nav-link">
              Create Exercise
            </Link> : ''}
            
          </li>
          <li className="navbar-item">
            {context.isLogged === false ? (
              <Link to="/user" className='nav-link text-primary'>
                Sign in
              </Link>
            ) : (  <Link to="/user" className='nav-link text-danger' onClick={() =>{
              setContext({
                userLogged: undefined,
                isLogged: false
              })
            }}>
                    Sign out
                </Link>
             
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
