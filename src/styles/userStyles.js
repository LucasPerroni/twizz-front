import styled from "styled-components"

export const Main = styled.main`
  position: absolute;
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;
  padding-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  * {
    transition: all 0.3s;
  }

  h1,
  .notice {
    margin: 20px 0;
    max-width: 80%;

    font-size: 25px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
  }

  h1 {
    margin: 0 0 20px;
    color: var(--site-theme);
  }
`

export const Create = styled.button`
  width: 80%;
  height: 40px;
  margin-bottom: 20px;

  border-radius: 20px;
  border: none;
  outline: none;

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  background-color: var(--site-theme-dark);

  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;

  &:hover:enabled {
    background-color: var(--site-theme);
  }
`

export const Decks = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`
