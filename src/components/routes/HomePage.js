import React,{useState} from "react";
import Statistics from "../stats/Statistics";

const HomePage = () => {
    const [state, setState] = useState({
        learn: true,
        train: false,
        share: false
    })

  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="text-primary">E-Tracker</h1>
      <h6>
        We track all exercises, you have the ability to share with friends
        your next workout.
      </h6>
      <Statistics />
      <button className="btn btn-outline-info m-3 "
      onClick={() =>{
          setState({
              learn: true,
              train: false,
              share: false
          })
      }}>
       
        <h4 className="mr-3 ml-3 mb-3 mt-3">Learn</h4>
      
      </button>
      <button className="btn btn-outline-warning m-3"
       onClick={() =>{
        setState({
            learn: false,
            train: true,
            share: false
        })
    }}>
       
        <h4 className="mr-3 ml-3 mb-3 mt-3">Train</h4>
       
      </button>
      <button className="btn btn-outline-success m-3"
       onClick={() =>{
        setState({
            learn: false,
            train: false,
            share: true
        })
    }}>
       
        <h4 className="mr-3 ml-3 mb-3 mt-3">Share</h4>
     
      </button>
       <br></br>
      {state.learn === true ? <img src='/coach.png' alt='learn' 
     
      style={{width: '4.5rem' , height: '8.5rem',margin: '1rem'}} /> : ''}
      {state.train === true ? <img src='/train.png' alt='learn' 
     
     style={{width: '20rem'}} /> : ''}
     {state.share === true ? <img src='/share.png' alt='learn' 
     
     style={{width: '19rem'}} /> : ''}
    </div>
  );
};

export default HomePage;
