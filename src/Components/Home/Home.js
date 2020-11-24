import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestStars, filterStars } from "../../redux/starReducer";


const Home = () => {
  const dispatch = useDispatch();
  const stars = useSelector(state => state.star.allStars);

  useEffect(() => {
    if (stars.length === 0) {
      dispatch(requestStars())
    }
  }, [])
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
