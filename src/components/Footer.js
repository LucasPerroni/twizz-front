import { useEffect, useState } from "react"
import { AiOutlineStar } from "react-icons/ai"

import { FooterComponent } from "../styles/footerStyles"

export default function Footer({ finalStatus, setFinalStatus, progress, deck, restartDeck }) {
  useEffect(() => {
    if (deck.Questions && progress.icons.length === deck.Questions.length) {
      const percentage = progress.correct / deck.Questions.length
      if (percentage === 1) {
        setFinalStatus("success")
      } else if (percentage > 0.5) {
        setFinalStatus("almost")
      } else {
        setFinalStatus("fail")
      }
    }
  }, [progress])

  return (
    <>
      {finalStatus === "" ? (
        <FooterComponent>
          <p className="bold">
            {progress.icons.length}/{deck.Questions ? deck.Questions.length : "?"}
          </p>
          <div>{progress.icons.map((icon) => icon)}</div>
        </FooterComponent>
      ) : (
        <FooterComponent className="finished">
          <>
            {finalStatus === "success" ? (
              <>
                <p className="bold">🥳 Congratulations!</p>
                <p>You remembered all the cards!</p>
              </>
            ) : finalStatus === "almost" ? (
              <>
                <p className="bold">🙂 Almost!</p>
                <p>You remembered more than half of the cards!</p>
              </>
            ) : (
              <>
                <p className="bold">😢 Welp...</p>
                <p>Don't give up. You can do it!</p>
              </>
            )}
            <p className="bold">
              {progress.icons.length}/{deck.Questions.length}
            </p>
            <div>{progress.icons.map((icon) => icon)}</div>
            <div>
              <button onClick={restartDeck}>Restart</button>
              <button className="favorite">
                <AiOutlineStar />
              </button>
            </div>
          </>
        </FooterComponent>
      )}
    </>
  )
}
