import styled from "styled-components"

export const FooterComponent = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;

  height: 70px;
  background-color: var(--background-theme-dark);
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    color: #ffffff;
    font-size: 20px;
    margin-bottom: 5px;

    &.bold {
      font-weight: bold;
    }
  }

  div {
    display: flex;
    align-items: center;

    max-width: 90%;
    overflow-x: auto;

    * {
      font-size: 23px;
      min-width: 33px;
      margin: auto;
    }

    .green {
      color: var(--card-green);
    }

    .yellow {
      color: var(--card-yellow);
    }

    .red {
      color: var(--card-red);
    }

    @media (min-width: 768px) {
      ::-webkit-scrollbar {
        height: 7px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: var(--scrollbar-theme);
        border-radius: 5px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: var(--scrollbar-theme-hover);
      }
    }
  }

  &.finished {
    padding: 10px 20px;
    height: 200px;
    justify-content: space-evenly;

    p {
      margin: 0;
      text-align: center;
    }

    button {
      height: 32px;
      width: 200px;
      background-color: var(--site-theme);

      border-radius: 10px;
      border: none;
      outline: none;

      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: var(--site-theme-dark);
      }

      &.favorite {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-left: 15px;
        width: 30px;
      }
    }
  }
`
