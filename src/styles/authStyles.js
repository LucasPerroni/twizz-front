import styled from "styled-components"
import { Link } from "react-router-dom"

export const Main = styled.main`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  @media (min-width: 768px) {
    display: flex;
  }
`

export const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Lobster", cursive;
  color: var(--site-theme);
  font-size: 60px;
  font-weight: 700;

  height: 175px;
  width: 100%;
  margin-bottom: 20px;
  padding: 0 120px;

  background-color: var(--background-theme-dark);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media (min-width: 768px) {
    height: 100%;
    align-items: center;
    margin: none;
  }
`

export const Auth = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 80%;
    margin-bottom: 15px;

    * {
      margin-bottom: 5px;
      width: 100%;
      height: 60px;

      font-size: 25px;
      border-radius: 10px;
      transition: all 0.3s;
    }

    input {
      background-color: transparent;
      outline: none;
      border: none;
      border-bottom: 2px solid var(--site-theme);

      padding: 15px;
      color: #ffffff;
    }

    input:focus {
      border-bottom: 2px solid var(--site-theme-dark);
    }

    button {
      margin: 20px;
      border: none;
      outline: none;

      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
      background-color: var(--site-theme-dark);

      font-weight: bold;
      color: #ffffff;
      cursor: pointer;
    }

    button:hover:enabled {
      background-color: var(--site-theme);
    }
  }

  .loading {
    opacity: 0.6;
    cursor: default;
  }

  @media (min-width: 768px) {
    height: 100%;
    justify-content: center;
  }
`

export const Fail = styled.p`
  font-size: 30px;
  font-weight: 700;
  color: var(--error);

  margin-bottom: 15px;
`

export const StyledLink = styled(Link)`
  color: aliceblue;
  text-decoration: none;
  margin: 10px 0 30px;

  font-size: 17px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`
