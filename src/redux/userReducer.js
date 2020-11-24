import axios from "axios";


const initialState = {
  user: {},
  loggedIn: false
};

const GET_USER = "GET_USER",
  CLEAR_USER = "CLEAR_USER";

export const loginUser = (username, password) => {
  return (dispatch) => {
    return axios
      .post("/api/auth/login", { username, password })
      .then(({ data }) => {
        dispatch(getUser(data));

      })
      .catch((err) => console.log(err))
  };
};

export const registerUser = (username, password) => {
  return (dispatch) => {
    return axios.post("/api/auth/register", { username, password })
    .then(({ data }) => {
      dispatch(getUser(data));
    })
    .catch((err) => console.log(err));
  }
}

export const refreshUser = () => {
  return (dispatch) => {
    return axios
    .get("/api/auth/refresh")
    .then(({ data }) => {
      dispatch(getUser(data));
    })
    .catch((err) => console.log(err));
  }
}

const getUser = (userObj) => {
  return {
    type: GET_USER,
    payload: userObj,
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    return axios
    .post("/api/auth/logout")
    .then((_) => {
      dispatch(clearUser());
    })
    .catch((err) => console.log(err));
  }
}

const clearUser = () => {
  return {
    type: CLEAR_USER,
    payload: {},
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return { ...state, user: payload, loggedIn: true };
    case CLEAR_USER:
      return { ...state, user: payload, loggedIn: false };
    default:
      return state;
  }
}
