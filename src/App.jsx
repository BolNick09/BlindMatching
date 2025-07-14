import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import DeadEnd from './Pages/DeadEnd'
import Home from './Pages/Home'
import NavBar from './Pages/NavBar'
import ResultsTable from './Pages/ResultsTable'
import PlayerForm from './PlayerForm'

import { useSelector, useDispatch } from 'react-redux'
import { 
  saveClickCount, 
  saveGlobalTime, 
  saveGameField, 
  resetGameState 
} from './slice';

import { 
  FcAlarmClock, 
  FcBinoculars,
  FcCellPhone,
  FcCloseUpMode,
  FcCamcorderPro,
  FcInTransit,
  FcLinux,
  FcHome,
} from "react-icons/fc";

function NavbarWrapper() {
  return (
    <div>
      <NavBar/>
      <Outlet/>
    </div>
  )
}

function Card({ icon: IconComponent, isFlipped, onClick }) 
{
  return (
    <div 
      onClick={onClick}
      style={{
        width: '100px', 
        height: '100px', 
        backgroundColor: isFlipped ? 'transparent' : 'white',
        margin: '10px', 
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}
    >
      {isFlipped && <IconComponent style={{ fontSize: '3rem' }} />}
    </div>
  );
}

function Game() 
{
  const icons = 
  [
    FcAlarmClock, 
    FcBinoculars,
    FcCellPhone,
    FcCloseUpMode,
    FcCamcorderPro,
    FcInTransit,
    FcLinux,
    FcHome,
  ];

  const { clicks, globalTime, gameField, isGameActive, playerName } =  useSelector(state => state.reduceSaver);
  const dispatch = useDispatch();


  const initializeGame = () => 
  {
    if (isGameActive && Array.isArray(gameField) && gameField.length > 0) 
    {
      return gameField.map(card => 
      ({
        ...card,
        icon: icons.find(icon => icon.name === card.iconName) || icons[0]
      }));
    }

    const pairs = [...icons, ...icons];
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    return shuffled.map(icon => ({
      icon,
      isFlipped: false,
      isMatched: false
    }));
  };

  const [cards, setCards] = useState(initializeGame());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timerActive, setTimerActive] = useState(isGameActive);

  useEffect(() => 
  {
    if (isGameActive) 
    {
      dispatch(saveGameField({
        cards: cards.map(card => ({
          ...card,
          iconName: card.icon.name
        })),
        flippedIndices,
        gameCompleted
      }));
    }
  }, [cards, flippedIndices, gameCompleted, dispatch, isGameActive]);

  useEffect(() => 
  {
    if (!gameCompleted && clicks > 0 && !timerActive) 
      setTimerActive(true);  
    

    let timer;
    if (timerActive) 
    {
      timer = setInterval(() => {
        dispatch(saveGlobalTime(globalTime + 1));
      }, 1000);
    }

    return () => 
    {
      if (timer) clearInterval(timer);
    };
  }, [timerActive, gameCompleted, clicks, globalTime, dispatch]);


  useEffect(() => 
  {
    if (cards.every(card => card.isMatched)) {
      setGameCompleted(true);
      setTimerActive(false);
      saveResults();
    }
  }, [cards, globalTime, clicks, playerName]);

  const handleCardClick = (index) => 
  {
    if (cards[index].isFlipped || flippedIndices.length >= 2 || cards[index].isMatched)     
      return;
    

    // Запуск таймера при первом клике
    if (!timerActive && clicks === 0) 
      setTimerActive(true);   
 
    const newClickCount = clicks + 1    
    dispatch(saveClickCount(newClickCount))

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) 
    {
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (cards[firstIndex].icon === cards[secondIndex].icon) 
      {
        setTimeout(() => 
        {
          setCards(prevCards =>
            prevCards.map((card, i) =>
              i === firstIndex || i === secondIndex
                ? { ...card, isMatched: true }
                : card
            )
          );
          setFlippedIndices([]);
        }, 500);
      } 
      else 
      {
        setTimeout(() => 
        {
          setCards(prevCards =>
            prevCards.map((card, i) =>
              newFlippedIndices.includes(i) && !card.isMatched
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };



  const saveResults = () => 
  {
    const score = Math.max(1000 - (globalTime * 10 + clicks * 5), 0);
    
    const newResult = {
      playerName: playerName || 'Н/д', 
      score,
      date: new Date().toISOString().replace('T', ' ').slice(0, 19),
      time: globalTime,
      clicks: clicks
    };

    try 
    {
      const storedResults = JSON.parse(localStorage.getItem('memoryGameResults')) || [];
      localStorage.setItem('memoryGameResults', JSON.stringify([...storedResults, newResult]));
    } 
    catch (error) 
    {
      console.error('Ошибка при сохранении результатов:', error);
    }
  };

  const resetGame = () => 
  {
    dispatch(resetGameState());
    const pairs = [...icons, ...icons];
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    setCards(shuffled.map(icon => ({
      icon,
      isFlipped: false,
      isMatched: false
    })));
    setFlippedIndices([]);
    setGameCompleted(false);
    setTimerActive(false);
  };

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        {cards.map((card, index) => (
          <Card
            key={index}
            icon={card.icon}
            isFlipped={card.isFlipped || card.isMatched}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      <div style={{ margin: '20px 0' }}>
        <p>Время: {globalTime} сек.</p>
        <p>Клики: {clicks}</p>      
        {gameCompleted && <p>Игра завершена! Очки: {Math.max(1000 - (globalTime * 10 + clicks * 5), 0)}</p>}
      </div>
      <button onClick={resetGame} style={{ padding: '10px 20px', fontSize: '1rem' }}>
        Новая игра
      </button>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper/>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/form",
        element: <PlayerForm />
      },
      {
        path: "/game",
        element: <Game />
      },
      {
        path: "/results",
        element: <ResultsTable />
      },
      {
        path: "*",
        element: <DeadEnd />
      },
    ]
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;