import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { requestStars } from "../../redux/starReducer";

const titleCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const Archive = () => {
  const dispatch = useDispatch();
  const stars = useSelector((state) => state.star.allStars);

  useEffect(() => {
    if (stars.length === 0) {
      dispatch(requestStars());
    }
  }, []);

  const mappedStars = stars.map((star) => {
    const { star_id, name, galaxy, star_type, username } = star;
    const displayName = titleCase(name);
    return (
      <div key={star_id}>
        <h3>
          {titleCase(name)} / {titleCase(galaxy)} / Class: {titleCase(star_type)} 
        </h3>
        <p>Discovered by {username}</p>
        <button>
          <Link to={`/archive/${star_id}`}>View</Link>
        </button>
      </div>
    );
  });

  return (
    <div>
      <h1>Archive</h1>
      {mappedStars}
    </div>
  );
};

export default Archive;
