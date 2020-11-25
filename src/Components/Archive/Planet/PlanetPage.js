import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const titleCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Planet = () => {
  const user = useSelector(state => state.user.user);
  const [planetInfo, setPlanetInfo] = useState({});

  let { planetid } = useParams();

  useEffect(() => {
    axios.get(`/api/archive/planets/${planetid}`).then(({ data }) => {
      setPlanetInfo(data);
    });
  }, []);

  const {
    name,
    type,
    hazard,
    sentinels,
    star_id,
    username,
  } = planetInfo;

  const ctrlPanel = username === user.username ? <button>Upload Picture</button> : <></>;

  if (name) {
    return (
      <div>
        <h1>{titleCase(name)}</h1>
        <h2>
          {titleCase(type)} / {titleCase(hazard)} / {titleCase(sentinels)}
        </h2>
        <p>Discovered by {username}</p>
        <button>
          <Link to={`/archive/${star_id}`}>Back to System</Link>
        </button>
        {" "}
        {ctrlPanel}
      </div>
    );
  } else {
    return <>Loading...</>;
  }
};

export default Planet;
