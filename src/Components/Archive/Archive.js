import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { requestStars } from "../../redux/starReducer";

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
  }

  const starItem = (star) => {
    const { star_id, name, galaxy, star_type, username } = star;
    const ctrlPanel = username === user.username ? <button onClick={deleteStar}>Delete</button> : <></>
    return (
      <div key={star_id}>
        <h3>
          {titleCase(name)} / {titleCase(galaxy)} / Class:{" "}
          {titleCase(star_type)}
        </h3>
        <p>Discovered by {username}</p>
        <button>
          <Link to={`/archive/${star_id}`}>View System</Link>
        </button>
        {" "}
        {ctrlPanel}
      </div>
    );
  };

  const mappedStars = toggleFilter ? filteredStars.map(starItem) : stars.map(starItem);

  return (
    <div>
      <h1>Archive</h1>
      <button onClick={() => {
        setToggleFilter(state => !state);
      }}>Toggle Filter</button>
      <br/>
      {mappedStars}
    </div>
  );
};

export default Archive;
