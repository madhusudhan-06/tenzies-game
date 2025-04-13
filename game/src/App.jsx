import './App.css'
import Die from './components/Die'
import { useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {

  const [dice, setDice] = useState(() => allNewDice());
  const buttonRef = useRef(null);

  let gameWon = dice.every((d) => d.isHeld === true) && dice.every((d) => d.num === dice[0].num);
  if(gameWon){
    buttonRef.current.focus();
  }

  function allNewDice() {
    const arrayObj = [];
    for (let i = 1; i <= 10; i++) {
      let num = Math.ceil(Math.random() * 6);
      let isHeld = false;
      arrayObj.push({ num, isHeld, id: nanoid() });

    }
    return arrayObj;
  }

  function changeDice() {
    if (gameWon) {
      setDice(allNewDice());
    }
    else {
      const changedFew = dice.map(d => (d.isHeld ? d : { ...d, num: Math.ceil(Math.random() * 6) }))
      setDice(changedFew);
    }
  }

  function changeHeld(id) {
    const updated = dice.map(d => (d.id === id ? { ...d, isHeld: !d.isHeld } : d));
    setDice(updated);
  }


  const dieNumbers = dice.map((d) => {
    return <Die key={d.id} number={d.num} isHeld={d.isHeld} id={d.id} toggleButton={changeHeld} />
  });

  return (
    <div className='outer'>
      <main className='main'>
        {gameWon && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="buttons-holder">
          {dieNumbers}
        </div>
        <button
          className="roll"
          onClick={changeDice}
          ref={buttonRef}
        >{gameWon ? 'New game' : 'Roll'}</button>
        {gameWon && <p>You Won!</p>}
      </main>
     </div>
  )
}

export default App
