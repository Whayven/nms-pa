import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestUserStars } from "../../redux/starReducer";
import styled from "styled-components";

import UploadPlanet from "./UploadPlanet";
import UploadStar from "./UploadStar";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
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


const Upload = () => {
  const dispatch = useDispatch();
  const userStars = useSelector(state => state.star.userStars);

  const [starToggle, setStarToggle] = useState(false);
  const [planetToggle, setPlanetToggle] = useState(false);

  useEffect(() => {
    dispatch(requestUserStars())
  }, [])

  const handleStarToggle = () => {
    setStarToggle(state => !state);
    setPlanetToggle(false);
  }

  const handlePlanetToggle =() => {
    setPlanetToggle(state => !state);
    setStarToggle(false);
  }

  const resetToggles = () => {
    setPlanetToggle(false);
    setStarToggle(false);
  }


  if (starToggle) {
    return (
      <div>
        <UploadStar />
        <Button onClick={resetToggles}>Cancel</Button>
      </div>
    )
  }
  else if (planetToggle) {
    return (
      <div>
        <UploadPlanet />
        <Button onClick={resetToggles}>Cancel</Button>
      </div>
    )
  }
  else {
    return (
      <Container>
        <Button onClick={handlePlanetToggle}>
          Upload Planet
        </Button>
        <Button onClick={handleStarToggle}>
          Upload Star
        </Button>
      </Container>
    )
  }
}

export default Upload;