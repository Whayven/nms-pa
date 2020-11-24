import axios from "axios";

const initialState = {
  allStars: [],
  userStars: []
};

const GET_STARS = "GET_STARS",
USER_STARS = "USER_STARS";

export const requestStars = () => {
  return (dispatch) => {
    return axios
      .get("/api/archive")
      .then(({ data }) => {
        dispatch(getStars(data));
      })
      .catch((err) => console.log(err));
  };
};

const getStars = (stars) => {
  return {
    type: GET_STARS,
    payload: stars,
  };
};

export const requestUserStars = () => {
  return (dispatch) => {
    return axios.get("/api/archive/me")
    .then(({ data }) => {
      dispatch(getUserStars(data))
    })

  }
}

const getUserStars = (stars) => {
  return {
    type: USER_STARS,
    payload: stars
  }
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_STARS:
      return { ...state, allStars: payload }
    case USER_STARS:
      return {...state, userStars: payload}
    default:
      return state;
  }
}