import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestUserStars } from "../../redux/starReducer";

const Upload = () => {
  const dispatch = useDispatch();
  const userStars = useSelector(state => state.star.userStars);

  useEffect(() => {
    dispatch(requestUserStars())
  }, [])

  return (
    <div>
      <h1>Upload</h1>
      { console.log(userStars) }
    </div>
  )
}

export default Upload;