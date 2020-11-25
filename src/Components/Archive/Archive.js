import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { requestStars } from "../../redux/starReducer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  padding: 5px;
  * {
    margin-bottom: 5px;
  }
`;

const Button = styled.button`
  background: black;
  border: 3px solid white;
  border-radius: 3px;
  color: white;
  height: 30px;
  font-weight: bold;
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

const Archive = () => {
  const dispatch = useDispatch();
  const stars = useSelector((state) => state.star.allStars);
  const user = useSelector((state) => state.user.user);

  const [toggleFilter, setToggleFilter] = useState(false);

  useEffect(() => {
    dispatch(requestStars());
  }, []);

  const filteredStars = stars.filter((star) => {
    return star.username === user.username;
  });

  const deleteStar = () => {
    // dispatch redux action to delete
  };

  const starItem = (star) => {
    const { star_id, name, galaxy, star_type, username } = star;
    const ctrlPanel =
      username === user.username ? (
        <Button onClick={deleteStar}>Delete</Button>
      ) : (
        <></>
      );
    return (
      <StarContainer key={star_id}>
        <h3>
          {titleCase(name)} / {titleCase(galaxy)} / Class:{" "}
          {titleCase(star_type)}
        </h3>
        <p>Discovered by {username}</p>
        <Button>
          <Link to={`/archive/${star_id}`}>View System</Link>
        </Button>{" "}
        {ctrlPanel}
      </StarContainer>
    );
  };

  const mappedStars = toggleFilter
    ? filteredStars.map(starItem)
    : stars.map(starItem);

  return (
    <Container>
      <h1>Archive</h1>
      <Button
        onClick={() => {
          setToggleFilter((state) => !state);
        }}
      >
        Toggle Filter
      </Button>
      <br />
      {mappedStars}
    </Container>
  );
};

export default Archive;
