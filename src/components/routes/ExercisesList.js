import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Exer from "../Exer";
import { AppContext } from "../../AppContext";

const ExercisesList = () => {
  const { context, setContext } = useContext(AppContext);
  const [state, setState] = useState({
    exercises: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((res) => {
        console.log(res.data);
        if (context.isLogged) {
          setState({
            exercises: res.data.filter((exe) => {
              return exe.username
                .toLowerCase()
                .includes(context.userLogged.toLowerCase());
            }),
          });
        } else {
          setState({
            exercises: res.data,
          });
        }

        console.log("exercise list mounted");
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      console.log(" exercise component unmounted");
    };
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data));
    setState({
      exercises: state.exercises.filter((el) => el._id !== id),
    });
  };
  const exerciseList = () => {
    return state.exercises.map((current, i) => {
      return (
        <Exer
          exercise={current}
          deleteEx={deleteExercise}
          id={current._id}
          key={i}
        />
      );
    });
  };
  return (
    <div>
      {context.isLogged === true ?  <h3 style={{textAlign: 'center'}}>Your Exercises </h3> : <h3 style={{textAlign: 'center'}}>Shared Exercises </h3>
      }
     
      <br></br>
      <div style={{ overflow: 'scroll',height: '60vh', overflowX: 'auto'}}>
      <table className="table" style={{width: '50%', margin: 'auto'}}>
        <thead className="text-success">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
           {context.isLogged === true ? <th>Actions</th> : <th></th> }
          </tr>
        </thead>
        <tbody  >{exerciseList()}</tbody>
      </table>
      </div>
    </div>
  );
};

export default ExercisesList;
