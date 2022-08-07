import styled from "styled-components"

export const Menu = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: 90%;
  height: 50px;
  margin-bottom: 20px;
  border-bottom: 2px solid var(--border-theme);

  * {
    color: grey !important;
    cursor: pointer;
  }

  .selected {
    color: var(--site-theme) !important;
  }
`
