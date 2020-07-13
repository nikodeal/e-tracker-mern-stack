import React, { useState, useMemo } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar/NavBar";
import ExercisesList from "./components/routes/ExercisesList";
import CreateExercise from "./components/routes/CreateExercise";
import CreateUser from "./components/routes/CreateUser";
import {AppContext} from './AppContext'
import HomePage from "./components/routes/HomePage";

function App() {
  const [ context , setContext ] = useState({
    userLogged: undefined,
    isLogged: false
  })

  const providedContext = useMemo(() => ({ context ,setContext}), [context, setContext])

  return (
    <AppContext.Provider value={providedContext}>
    <BrowserRouter>
      <div >
        <NavBar />
        <br />
        <main>
          <Switch>
            <Route path='/' exact >
              <HomePage />
            </Route>
            <Route path="/exercises" exact>
              <ExercisesList />
            </Route>

            <Route path="/create" exact>
              <CreateExercise />
            </Route>
            <Route path="/user" exact>
              <CreateUser />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
