import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlanetList from "./PlanetList";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 18px;
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

const StarPage = () => {
  const [starInfo, setStarInfo] = useState({});

  let { starid } = useParams();

  useEffect(() => {
    axios
      .get(`/api/archive/${starid}`)
      .then(({ data }) => {
        setStarInfo(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const { name, star_type, galaxy, economy, conflict, username } = starInfo;
  if (name) {
    return (
      <Container>
        <h1>{titleCase(name)}</h1>
        <h2>
          {titleCase(star_type)} Star / {titleCase(galaxy)} / Tier {economy}{" "}
          Economy /{" "}
          {titleCase(conflict)}
        </h2>
        <p>Discovered by {username}</p>
        <br />
        <PlanetList starid={starid} />
      </Container>
    );
  } else {
    return <>Loading...</>;
  }
};

export default StarPage;
