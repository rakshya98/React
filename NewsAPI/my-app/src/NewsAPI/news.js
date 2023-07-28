import {Button} from "@mui/material";
import './news.css';
import { useState, useEffect } from "react";
import axios from 'axios';
function News() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    getNewsData();
  }, []);

  const getNewsData = () => {
    const apiKey = 'bdeaf2fa6f2d4c37aed5c02efb4dd45b'; // Replace with your actual API key
    const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2023-06-28&sortBy=publishedAt&apiKey=bdeaf2fa6f2d4c37aed5c02efb4dd45b`;

    axios.get(apiUrl)
      .then(function (response) {
        setNewsData(response.data.articles);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return(
    <div class="container">
        <div>
          <h2>GET THE LATEST DOSE OF NEWS</h2> 
          <h4>Follow our site for authentic and latest news from all over the world.</h4>
          </div>
    {newsData.map((item, index) => (
    // {[1,1,1].map((item)=>
    
<div key={index} className="newsContainer">

    <div  className="left"></div>

    <div className="newsTitle">
    <h1> {item.title} </h1>
      </div>

    <div className="newsImage">
    <img src = {item.urlToImage} alt = ""/>
    </div>

    <div className = "newsPublish">
        <p><i><b>{item.author}</b></i> | {item.publishedAt}</p> 
    </div> 

    <div className = "description">
        <p>{item.description}</p>
    </div>
    <Button variant="contained" className = "readMore">Read Full News</Button>
   
</div>

// )}
))}

</div>

);


}

export default News;
