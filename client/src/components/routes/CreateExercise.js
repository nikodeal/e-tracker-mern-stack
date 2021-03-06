import React, { useState  ,useContext} from "react";
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../AppContext";


const CreateExercise = () => {
  const { context} = useContext(AppContext);
  const [state, setState] = useState({
    username: context.userLogged,
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
      
    });
  };
  
 const handleDateChanger = date =>{
     setState({
         ...state,
         date: date
     })
 }
 let history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault();
    const exercise = {
        username: state.username,
        description: state.description,
        duration: state.duration,
        date: state.date
    }
    console.log(exercise);
    axios.post('https://e-tracker-mern.herokuapp.com/exercises/add' , exercise)
    .then(res => console.log(res.data));
  history.push('/exercises')
  };
 
  return (
    <div>
      <h3 style={{textAlign: 'center'}}>Share New Exercise</h3>
      <form onSubmit={handleSubmit} style={{width: '50%', margin: 'auto'}}>
        <div className="form-group">
          Username:
          <input
            type="text"
            required
           className='form-control'
            name="username"
             value={state.username} 
            onChange={handleChange}
            disabled
      />
        </div>
        <div className="form-group">
          Description:
          <input
            type="text"
            name="description"
            className="form-control"
            value={state.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          Duration (in minutes):
          <input
            type="text"
            className="form-control"
            name="duration"
            value={state.duration}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
         Date:
          <DatePicker selected={state.date} onChange={handleDateChanger} />
        </div>
        <div className="form-group">
            <input type='submit' value='Create' className='btn btn-primary' />

        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
