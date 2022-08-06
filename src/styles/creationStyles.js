import styled from "styled-components"

export const Main = styled.main`
  position: absolute;
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  * {
    transition: all 0.3s;
  }

  span {
    margin: 15px 0;
    border-bottom: 2px solid var(--border-theme);
    width: 90%;
  }

  button {
    margin-bottom: 5px;
    width: 80%;
    min-height: 40px;

    font-size: 20px;
    border-radius: 20px;

    margin: 20px 0 5px;
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

  p {
    max-width: 90%;
    margin-bottom: 25px;

    font-size: 30px;
    font-weight: 700;
    text-align: center;
    color: var(--error);
  }

  .loading {
    opacity: 0.6;
    cursor: default;
  }
`

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: var(--site-theme);
  margin: 10px 0 15px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-bottom: 15px;

  article {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  input,
  textarea {
    margin-bottom: 10px;
    min-width: 80%;
    max-width: 80%;
    height: 40px;

    font-size: 20px;
    border-radius: 10px;

    background-color: transparent;
    outline: none;
    border: none;
    border: 2px solid var(--site-theme);

    padding: 15px;
    color: #ffffff;
  }

  textarea {
    min-height: 150px;
    min-height: 150px;
    resize: none;
  }

  input:focus,
  textarea:focus {
    border: 2px solid var(--site-theme-dark);
  }

  button {
    margin-bottom: 25px;
  }

  @media (min-width: 768px) {
    textarea::-webkit-scrollbar {
      width: 4px;
    }

    textarea::-webkit-scrollbar-track {
      display: none;
    }

    textarea::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
  }
`
