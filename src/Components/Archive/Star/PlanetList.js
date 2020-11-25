import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const PlanetLink = styled.h2`
  a {
    text-decoration: none;
    color: white;
  }
  a:hover {
    color:grey;
  }
`;

const Button = styled.button`
  background: black;
  border: 3px solid white;
  border-radius: 3px;
  color: white;
  height: 30px;
  font-weight:bold;
  cursor: pointer;

  a {
    color: white;
    text-decoration: none;
  }

  :hover {
    border-color: grey;
    color: grey;
    a {
      color: grey;
    }
  }
`;

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
    const ctrlPanel = username === user.username ? <Button onClick={deletePlanet}>Delete</Button> : <></>
    
    return (
      <div key={planet_id}>
        <PlanetLink><Link to={`/archive/planets/${planet_id}`}>{titleCase(name)}</Link></PlanetLink>
        {" "}
        {ctrlPanel}
      </div>
    );
  });

  return <div>{mappedPlanets}</div>;
};

export default PlanetList;
