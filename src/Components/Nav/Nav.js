import React from "react";
import { useDispatch } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { logoutUser } from "../../redux/userReducer";

const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 50px;
    background: black;
    letter-spacing: 2px;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  background: rgb(0, 0, 0);
  color: white;
`;

const NavLinksContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  width: 75%;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 20px;
`;

const Nav = (props) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  if (props.location.pathname !== "/") {
    return (
      <NavContainer>
        <Banner>
          <h1>Planetary Archive</h1>
        </Banner>
        <NavLinksContainer>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/archive">Archive</NavLink>
          <NavLink to="/upload">Upload</NavLink>
          <NavLink to="/" onClick={logout}>
            Logout
          </NavLink>
        </NavLinksContainer>
      </NavContainer>
    );
  } else {
    return <></>;
  }
};

export default withRouter(Nav);
