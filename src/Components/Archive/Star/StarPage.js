import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlanetList from "./PlanetList";

const titleCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

const StarPage = () => {
  const [starInfo, setStarInfo] = useState({});

  let {starid} = useParams();

  useEffect(() => {
    axios.get(`/api/archive/${starid}`)
    .then(({ data }) => {
      setStarInfo(data)
    })
    .catch(err => console.log(err));
  }, [])

  

  const { name, star_type, galaxy, economy, conflict, username } = starInfo;
  if (name) {
    return (
      <div>
        <h1>{titleCase(name)}</h1>
        <h2>
          {titleCase(star_type)} Star / 
          {titleCase(galaxy)} / 
          Tier {economy} Economy / 
          {titleCase(conflict)}
          </h2>
        <p>Discovered by {username}</p>
        <br />
        <PlanetList starid={starid} />
      </div>
    )
  } else { return (<>Loading...</>)}
}

export default StarPage;