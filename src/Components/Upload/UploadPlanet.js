import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom: 10px;
font-size: 18px;
`;

const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 400px;
  margin: 0 auto;
  padding: 15px 0;
`;

const Button = styled.button`
  background: black;
  border: 3px solid white;
  border-radius: 3px;
  color: white;
  height: 30px;
  font-weight:bold;
  cursor: pointer;
  margin-top: 5px;
  :hover {
    border-color: grey;
    color: grey;
  }
`;

const UploadPlanet = () => {
  const userStars = useSelector(state => state.star.userStars)

  const [ptName, setPtName] = useState("");
  const [ptType, setPtType] = useState("");
  const [ptHazard, setPtHazard] = useState("none");
  const [ptSentinels, setPtSentinels] = useState("none");
  const [ptStar, setPtStar] = useState(0);
  const [starData, setStarData] = useState(userStars);

  const hazardData = ["none", "hot", "cold", "toxic", "radioactive"];
  const sentinelData = ["none", "low activity", "high activity", "aggressive"];

  useEffect(() => {
    setStarData(userStars)
    if (userStars[0] != null) {
      setPtStar(userStars[0].star_id)
    } 
  }, [userStars]);
  
  
  const makeOption = (el, i) => <option key={i} value={el}>{el}</option>;
  const makeStarOptions = (star, i) => <option key={i} value={star.star_id}>{star.name}</option>;

  const uploadNewPlanet = () => {
    axios.post("/api/upload/planet", { ptName, ptType, ptHazard, ptSentinels, ptStar })
    .then((res) => {
      setPtName("")
      setPtType("")
      setPtHazard("none")
      setPtSentinels("none");
    })
    .catch(err => console.log(err));
  }


  return (
    <Container>
      <h1>Upload Planet</h1>
      <CreateContainer>
        <label>Name: </label>
        <input value={ptName} type="text" onChange={(e) => {
          setPtName(e.target.value);
        }} />
        {" "}
        <label>Type: </label>
        <input value={ptType} type="text" onChange={(e) => {
          setPtType(e.target.value)
        }} />
        {" "}
        <label>Hazard: </label>
        <select value={ptHazard} onChange={(e) => {
          setPtHazard(e.target.value);
        }}>
          {hazardData.map(makeOption)}
        </select>
        <label>Sentinels: </label>
        <select value={ptSentinels} onChange={(e) => {
          setPtSentinels(e.target.value);
        }}>
          {sentinelData.map(makeOption)}
        </select>
        {" "}
        <label>Star System: </label>
        <select value={ptStar} onChange={(e) => {
          setPtStar(e.target.value) 
        }}>
          {starData.map(makeStarOptions)}
        </select>
        {" "}
        <Button onClick={uploadNewPlanet}>Upload</Button>
      </CreateContainer>
    </Container>
  )
}

export default UploadPlanet;