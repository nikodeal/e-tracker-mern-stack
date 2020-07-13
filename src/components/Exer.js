import React,{useContext} from 'react'
import { AppContext } from "../AppContext";

const Exer = ({exercise , deleteEx , id}) => {
    const { context , setContext }= useContext(AppContext)
    return (
      <tr >
          <td>{exercise.username}</td>
    <td>{exercise.description}</td>
    <td>{exercise.duration}</td>
    <td>{exercise.date.substring(0,10)}</td>
       {context.isLogged === true ?  <td> <button className='btn btn-danger' onClick={() =>{
              deleteEx(id)
          }} >delete</button></td> :<td></td>} 
      </tr>
    )
}

export default Exer
