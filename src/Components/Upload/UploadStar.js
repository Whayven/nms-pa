import React, { useState } from "react";
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

const UploadStar = () => {
  const starTypeData = ["yellow", "red", "green", "blue"];
  const economyData = [1, 2, 3];
  const conflictData = ["low", "medium", "high"];

  const [name, setName] = useState("");
  const [type, setType] = useState(starTypeData[0]);
  const [galaxy, setGalaxy] = useState("");
  const [economy, setEconomy] = useState(economyData[0]);
  const [conflict, setConflict] = useState(conflictData[0]);
  const [address, setAddress] = useState("");

  const makeOption = (el, i) => <option key={i} value={el}>{el}</option>;

  const uploadNewStar = () => {
    // refractor to dispatch redux action
    axios.post("/api/upload/star", { name, type, galaxy, economy, conflict, address }) 
    .then((res) => {
      console.log(res.data);
      setName("");
      setType(starTypeData[0]);
      setGalaxy("");
      setEconomy(economyData[0]);
      setConflict(conflictData[0]);
    })
    .catch(err => {
      console.log(err);
    }) 
  }

  return (
    <Container>
      <h1>Upload Star</h1>
      <CreateContainer>
        <label>Name: </label>
        <input value={name} type="text" onChange={(e) => {
          setName(e.target.value)
        }} />
        {" "}
        <label>Type: </label>
        <select value={type} onChange={(e) => {
          setType(e.target.value)
        }}>
          {starTypeData.map(makeOption)}
        </select>
        {" "}
        <label>Galaxy: </label>
        <input value={galaxy} type="text" onChange={(e) => {
          setGalaxy(e.target.value)
        }} />
        <label>Economy: </label>
        <select value={economy} onChange={(e) => {
          setEconomy(e.target.value)
        }}>
          {economyData.map(makeOption)}
        </select>
        {" "}
        <label>Conflict: </label>
        <select value={conflict} onChange={(e) => {
          setConflict(e.target.value)
        }} >
          {conflictData.map(makeOption)}
        </select>
        {" "}
        <Button onClick={uploadNewStar}>Upload</Button>
      </CreateContainer>
    </Container>
  )
}

export default UploadStar;