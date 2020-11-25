import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestStars } from "../../redux/starReducer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 10px auto;
  border: 4px solid #black;
  border-radius: 8px;
  font-size: 24px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const stars = useSelector(state => state.star.allStars);

  useEffect(() => {
    if (stars.length === 0) {
      dispatch(requestStars())
    }
  }, [])
  return (
    <Container>
      <h1>Welcome to to the Archive!</h1>
      <p>
        If you enjoy intergalactic photography, then you've stumbled across the right website.  Planetary Archive is all about sharing your discoveries in No Man's Sky!  The universe is beautiful and there's no way you'll see it all alone.  Take a break, upload some pictures, and share in the beauty with fellow travellers. 
      </p>
    </Container>
  );
};

export default Home;
