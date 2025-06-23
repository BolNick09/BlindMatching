import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom"
import DeadEnd from './Pages/DeadEnd'
import Home from './Pages/Home'
import NavBar from './Pages/NavBar'
import ResultsTable from './Pages/ResultsTable'

import { useSelector, useDispatch } from 'react-redux'
import { saveClickCount, saveGlobalTime, resetGameState } from './slice';

import 
{ 
  FcAlarmClock, 
  FcBinoculars,
  FcCellPhone,
  FcCloseUpMode,
  FcCamcorderPro,
  FcInTransit,
  FcLinux,
  FcHome,
} from "react-icons/fc";

function NavbarWrapper()
{
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
      style=
      {{
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

  const createShuffledIcons = () => 
  {
    const pairs = [...icons, ...icons];
    return pairs.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(createShuffledIcons().map(icon => 
  (
    {
    icon,
    isFlipped: false,
    isMatched: false
  }
  )));
  const [flippedIndices, setFlippedIndices] = useState([]);

  // const [time, setTime] = useState(0); // Счетчик времени (секунды)
  const [gameCompleted, setGameCompleted] = useState(false); // Флаг завершения игры
  const clickCount = useSelector((state) => state.reduceSaver.clicks)
  const globalTime = useSelector((state) => state.reduceSaver.globalTime)


  const [timerActive, setTimerActive] = useState(false); // Флаг активности таймера

  const dispatch = useDispatch()
  // Запуск таймера при первом клике
useEffect(() => {
  // Запуск таймера если:
  // 1. Игра не завершена
  // 2. Есть хотя бы один клик
  // 3. Таймер не активен
  if (!gameCompleted && clickCount > 0 && !timerActive) 
    setTimerActive(true);  

  let timer;
  if (timerActive) 
  {
    timer = setInterval(() => 
    {
      dispatch(saveGlobalTime(globalTime + 1));
    }, 1000);
  }

  return () => 
  {
    if (timer) clearInterval(timer);
  };
}, [timerActive, gameCompleted, clickCount, globalTime, dispatch]);

  // Проверка на завершение игры
  useEffect(() => 
  {
    if (cards.every(card => card.isMatched)) 
    {
      setGameCompleted(true);
      setTimerActive(false);
      saveResults();
    }
  }, [cards]);

  const handleCardClick = (index) => 
  {
    if (cards[index].isFlipped || flippedIndices.length >= 2 || cards[index].isMatched)     
      return;
    

    // Запуск таймера при первом клике
    if (!timerActive && clickCount === 0) 
      setTimerActive(true);   
 
    const newClickCount = clickCount + 1    
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
  const score = Math.max(1000 - (globalTime * 10 + clickCount * 5), 0);

  const newResult = 
  {
    score,
    date: new Date().toISOString().replace('T', ' ').slice(0, 19),
    time: globalTime,
    clicks: clickCount
  };

  const storedResults = JSON.parse(localStorage.getItem('memoryGameResults')) || [];
  localStorage.setItem('memoryGameResults', JSON.stringify([...storedResults, newResult]));
};

const resetGame = () => 
{
  setCards(createShuffledIcons().map(icon => ({
    icon,
    isFlipped: false,
    isMatched: false
  })));
  setFlippedIndices([]);
  dispatch(resetGameState());
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
        <p>Клики: {clickCount}</p>
        {gameCompleted && <p>Игра завершена! Очки: {Math.max(1000 - (globalTime * 10 + clickCount * 5))}</p>}
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
        children:[
            {
                path: "/",
                element: <Home />  // Root?
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
    ]
  )

function App() 
{
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}


export default App;