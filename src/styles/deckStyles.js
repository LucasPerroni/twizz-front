import styled from "styled-components"

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;

  height: 70px;
  background-color: var(--background-theme-dark);
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.25);

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 90%;
    overflow-x: auto;

    * {
      font-size: 30px;
      min-width: 30px;
      margin-right: 15px;
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
      * {
        margin: 5px 7.5px;
      }

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
`
