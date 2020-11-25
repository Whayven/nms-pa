import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const titleCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const PlanetList = (props) => {
  const user = useSelector(state => state.user.user);

  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/archive/${props.starid}/planets`)
      .then(({ data }) => {
        setPlanets(data)
      })
      .catch((err) => console.log(err));
  }, []);

  const deletePlanet = () => {
    // Delete planet
  }

  const mappedPlanets = planets.map((planet) => {
    const { name, planet_id, username } = planet; 
    const ctrlPanel = username === user.username ? <button onClick={deletePlanet}>Delete</button> : <></>
    
    return (
      <div key={planet_id}>
        <h2><Link to={`/archive/planets/${planet_id}`}>{titleCase(name)}</Link></h2>
        {" "}
        {ctrlPanel}
      </div>
    );
  });

  return <div>{mappedPlanets}</div>;
};

export default PlanetList;
