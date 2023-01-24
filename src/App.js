import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import './App.css';

const cardImages = [
  { "src": "/img/helmet.png" },
  { "src": "/img/potion.png" },
  { "src": "/img/ring.png" },
  { "src": "/img/scroll.png" },
  { "src": "/img/shield.png" },
  { "src": "/img/sword.png" }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src == choiceOne) {
              return { ...card, matched: true }
            }
            else {
              return card
            }
          })
        })
        resetTurn()
      }
      else {

        resetTurn()
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(turns + 1)
  }

  return (
    <div className="App">
      <h1>Match the Card</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.key} card={card} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
}

export default App;
