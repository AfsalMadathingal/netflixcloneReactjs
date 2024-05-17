import React, { useEffect, useRef, useState } from "react";
import "./titlecard.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({title,category}) => {



  const cardsRef = useRef();

  const [apiData, setApiData] = useState([])
  const cardRef = useRef()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDU1ODY2OTI4ZGI3YTk1NmM4OGRkOWY5ZjA5M2M0MCIsInN1YiI6IjY2NDZlMzJmOTUwMTUxOWM5ZDFjZWY0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.92InHi7cNwUkPi_8lQCWhQ-QUEJFENuNkn58NYtXRKk'
    }
  };

  

  const handleWheel = (event) => {
    event.preventDefault();

    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
  
    fetch(`https://api.themoviedb.org/3/movie/${category? category : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));
      
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-Cards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            
            <Link to={`/player/${card.id}`} key={index} className="card">
              <img src={"https://image.tmdb.org/t/p/w500/"+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
