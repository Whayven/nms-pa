import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PlanetList = (props) => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/archive/${props.starid}/planets`)
      .then(({ data }) => {
        setPlanets(data)
      })
      .catch((err) => console.log(err));
  }, []);

  const mappedPlanets = planets.map((planet) => {
    return (
      <div key={planet.planet_id}>
        <h2>{planet.name}</h2>
        <button>
          <Link to={`/archive/planets/${planet.planet_id}`}>View</Link>
        </button>
      </div>
    );
  });

  return <div>{mappedPlanets}</div>;
};

export default PlanetList;
