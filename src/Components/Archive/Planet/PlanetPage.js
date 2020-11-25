import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import UploadImage from "../../Upload/UploadImage";

const titleCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Planet = () => {
  const user = useSelector((state) => state.user.user);
  const [planetInfo, setPlanetInfo] = useState({});
  const [planetImages, setPlanetImages] = useState([]);

  let { planetid } = useParams();

  useEffect(() => {
    axios.get(`/api/archive/planets/${planetid}`).then(({ data }) => {
      setPlanetInfo(data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/archive/images/${planetid}`).then(({ data }) => {
      setPlanetImages(data);
    });
  }, []);

  const { name, type, hazard, sentinels, star_id, username } = planetInfo;

  const gallery = planetImages.map((planetImage, i) => {
    return (
      <img
        key={planetImage.planet_image_id}
        src={planetImage.planet_image_url}
        alt={name + " planet"}
        width="640"
        height="360"
      />
    );
  });
  const ctrlPanel =
    username === user.username ? <UploadImage planetid={planetInfo.planet_id} setImages={setPlanetImages} /> : <></>;

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
        </button>{" "}
        <br />
        {ctrlPanel}
        {gallery}
        
      </div>
    );
  } else {
    return <>Loading...</>;
  }
};

export default Planet;
