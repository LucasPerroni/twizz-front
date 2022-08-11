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

  &.has-footer {
    padding-bottom: 70px;
  }

  &.footer-finished {
    padding-bottom: 200px;
  }

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
    margin: 0 10px 20px;
    color: var(--site-theme);
  }

  @media (min-width: 768px) {
    ::-webkit-scrollbar {
      width: 10px;
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
`

export const Create = styled.button`
  width: 80%;
  min-height: 40px;
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
  width: 100%;
`
