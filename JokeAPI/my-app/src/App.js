import React, { useState } from "react";
import './App.css';

import Axios from 'axios';
import { Button } from "@mui/material";

function App() {

const [jokes, setJokes] = useState([]);


const getJokes = () => {
  Axios.get("https://official-joke-api.appspot.com/random_ten")
    .then((response) => {
      setJokes(response.data);
    })
    .catch((error) => {
      console.error("Error fetching jokes:", error);
    });
};


return (
 
      <div>

   
  <div className="container">
   <h1 style={{color:'green',marginBottom:'30px'}}>Welcome to the site !</h1>
   <p style={{color:'green',marginBottom:'30px'}}>We're hoping  you'll find our jokes funny and entertaining !!!  </p>
    <Button variant="contained" onClick={getJokes} style={{backgroundColor:'green',marginBottom:'30px'}}>
      Get  Jokes
    </Button>
    
      {jokes.map((joke, index) => (
        <div  key={index}>
          <div className="jokes">
          <div className="type">
         <p> <Button variant="contained" style={{backgroundColor:'green' ,fontSize:'10px'}}>{joke.type}</Button></p>
          </div>
          <div className="setup">

          <h1>{joke.setup}</h1>
          </div>
          <div className="punchline">
          <p>{joke.punchline}</p>
          </div>
          <hr/>
        </div>
        </div>
      ))}
      
    </div>
    <hr/>
  </div>
  
  
);


}
export default App;
