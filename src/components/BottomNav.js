import styled from "styled-components"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai"

export default function BottomNav({ page, changePage, totalDecks }) {
  return (
    <Nav>
      {page > 1 ? (
        <>
          <AiOutlineDoubleLeft className="icon" onClick={() => changePage(1)} />
          <IoIosArrowBack className="icon" onClick={() => changePage(page - 1)} />
          <button onClick={() => changePage(page - 1)}>{page - 1}</button>
        </>
      ) : (
        <></>
      )}
      <button className="selected">{page}</button>
      {10 * page >= totalDecks ? (
        <></>
      ) : (
        <>
          <button onClick={() => changePage(page + 1)}>{page + 1}</button>
          <IoIosArrowForward className="icon" onClick={() => changePage(page + 1)} />
          <AiOutlineDoubleRight className="icon" onClick={() => changePage(Math.ceil(totalDecks / 10))} />
        </>
      )}
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  * {
    background-color: transparent;
    border: none;
    outline: none;

    height: 35px;
    width: 35px;
    margin: 0 5px;

    border-radius: 50%;
    cursor: pointer;

    color: #ffffff;
    font-size: 17px;

    &:hover {
      background-color: var(--card-theme);
    }
  }

  .selected {
    background-color: var(--card-theme-dark);
  }

  .icon {
    height: 30px;
    width: 30px;
    background-color: transparent;
  }
`
