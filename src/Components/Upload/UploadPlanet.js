import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

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
    <div>
      <h1>Upload Planet</h1>
      <div>
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
        <br/>
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
        <button onClick={uploadNewPlanet}>Upload</button>
      </div>
    </div>
  )
}

export default UploadPlanet;