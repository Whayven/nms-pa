import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestUserStars } from "../../redux/starReducer";

import UploadPlanet from "./UploadPlanet";
import UploadStar from "./UploadStar";

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
        <button onClick={resetToggles}>Cancel</button>
      </div>
    )
  }
  else if (planetToggle) {
    return (
      <div>
        <UploadPlanet />
        <button onClick={resetToggles}>Cancel</button>
      </div>
    )
  }
  else {
    return (
      <div>
        <button onClick={handlePlanetToggle}>
          Upload Planet
        </button>
        <button onClick={handleStarToggle}>
          Upload Star
        </button>
      </div>
    )
  }
}

export default Upload;