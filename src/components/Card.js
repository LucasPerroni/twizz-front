import { useState } from "react"
import styled from "styled-components"
import { IoMdRepeat } from "react-icons/io"
import { BsPlay } from "react-icons/bs"
import { BsFillCheckCircleFill, BsQuestionCircleFill, BsFillXCircleFill } from "react-icons/bs"

export default function Card({ question, questionNumber, progress, setProgress }) {
  const [showCard, setShowCard] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [stateClass, setStateClass] = useState("")

  const icons = {
    green: <BsFillCheckCircleFill className="icon" />,
    yellow: <BsQuestionCircleFill className="icon" />,
    red: <BsFillXCircleFill className="icon" />,
  }

  function closeCard(state) {
    setStateClass(state)
    setShowCard(false)

    if (state === "green") {
      setProgress({
        correct: progress.correct + 1,
        icons: [...progress.icons, <BsFillCheckCircleFill key={question.id} className="green" />],
      })
    } else if (state === "yellow") {
      setProgress({
        correct: progress.correct + 1,
        icons: [...progress.icons, <BsQuestionCircleFill key={question.id} className="yellow" />],
      })
    } else {
      setProgress({
        correct: progress.correct,
        icons: [...progress.icons, <BsFillXCircleFill key={question.id} className="red" />],
      })
    }
  }

  return (
    <>
      {showCard ? (
        <CardContainer>
          <Inner className={isFlipped ? "flip" : ""}>
            <Front className="face">
              <img src={question.image} />
              <p>{question.question}</p>
              <FlipIcon onClick={() => !isFlipped ? setIsFlipped(!isFlipped) : ""} />
            </Front>

            <Back className="face">
              <FlipIcon className="back" onClick={() => setIsFlipped(!isFlipped)} />
              <p>{question.answer}</p>
              <div>
                <button className="red" onClick={() => closeCard("red")}>
                  Didn't remembered
                </button>
                <button className="yellow" onClick={() => closeCard("yellow")}>
                  Almost didn't remembered
                </button>
                <button className="green" onClick={() => closeCard("green")}>
                  Remembered!
                </button>
              </div>
            </Back>
          </Inner>
        </CardContainer>
      ) : (
        <QuestionContainer className={stateClass}>
          <p>Question {questionNumber}</p>
          {stateClass !== "" ? (
            icons[stateClass]
          ) : (
            <BsPlay className="icon" onClick={() => setShowCard(true)} />
          )}
        </QuestionContainer>
      )}
    </>
  )
}

const QuestionContainer = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;

  min-width: 80%;
  min-height: 40px;
  padding: 0 15px;
  margin-bottom: 25px;

  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);

  p {
    font-size: 20px;
    font-weight: 700;
  }

  .icon {
    font-size: 25px;
    cursor: pointer;
  }

  &.green {
    background-color: var(--card-background-green);

    * {
      color: var(--card-green);
      text-decoration: line-through;
      cursor: default;
    }
  }

  &.red {
    background-color: var(--card-background-red);

    * {
      color: var(--card-red);
      text-decoration: line-through;
      cursor: default;
    }
  }

  &.yellow {
    background-color: var(--card-background-yellow);

    * {
      color: var(--card-yellow);
      text-decoration: line-through;
      cursor: default;
    }
  }
`

const CardContainer = styled.article`
  background-color: transparent;
  width: 90%;
  min-width: 320px;
  max-width: 340px;
  min-height: 275px;
  margin-bottom: 25px;
  perspective: 1000px;

  .flip {
    transform: rotateY(180deg);
  }
`

const FlipIcon = styled(IoMdRepeat)`
  position: fixed;
  bottom: 15px;
  right: 15px;

  background-color: var(--card-background-theme);
  border-radius: 7px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);

  font-size: 25px;
  cursor: pointer;

  &.back {
    bottom: 80px;
  }
`

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  .face {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 15px;
    border-radius: 10px;

    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: var(--card-background-theme);
    overflow-y: auto;

    p {
      font-size: 20px;
      text-align: justify;
      margin-bottom: 35px;
    }

    @media (min-width: 768px) {
      ::-webkit-scrollbar {
        width: 7px;
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

const Front = styled.div`
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);

  img {
    max-height: 175px;
    max-width: 250px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
`

const Back = styled.div`
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  transform: rotateY(180deg);

  p {
    height: 60%;
    overflow-y: auto;
    padding-right: 10px;

    @media (min-width: 768px) {
      ::-webkit-scrollbar {
        width: 5px;
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

  div {
    position: absolute;
    bottom: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 90%;

    button {
      min-height: 40px;
      height: 50px;
      width: 95px;

      font-size: 14px;
      border-radius: 5px;
      outline: none;
      border: none;

      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
      color: #ffffff;
      cursor: pointer;
    }

    .green {
      background-color: var(--card-green);
    }

    .red {
      background-color: var(--card-red);
    }

    .yellow {
      background-color: var(--card-yellow);
    }
  }
`
