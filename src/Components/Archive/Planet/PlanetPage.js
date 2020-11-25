import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import UploadImage from "../../Upload/UploadImage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const Button = styled.button`
  background: black;
  border: 3px solid white;
  border-radius: 3px;
  color: white;
  height: 30px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 5px;

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

const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  padding: 5px;
`;

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
      <Image
        key={planetImage.planet_image_id}
        src={planetImage.planet_image_url}
        alt={name + " planet"}
        width="640"
        height="360"
      />
    );
  });
  const ctrlPanel =
    username === user.username ? (
      <UploadImage
        planetid={planetInfo.planet_id}
        setImages={setPlanetImages}
      />
    ) : (
      <></>
    );

  if (name) {
    return (
      <Container>
        <h1>{titleCase(name)}</h1>
        <h2>
          {titleCase(type)} / {titleCase(hazard)} / {titleCase(sentinels)}
        </h2>
        <p>Discovered by {username}</p>
        <Button>
          <Link to={`/archive/${star_id}`}>Back to System</Link>
        </Button>{" "}
        <br />
        {ctrlPanel}
        <Gallery>{gallery}</Gallery>
      </Container>
    );
  } else {
    return <>Loading...</>;
  }
};

export default Planet;
