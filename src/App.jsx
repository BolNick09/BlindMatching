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
  const [clicks, setClicks] = useState(0); // Счетчик кликов
  const [time, setTime] = useState(0); // Счетчик времени (секунды)
  const [gameCompleted, setGameCompleted] = useState(false); // Флаг завершения игры
  const [timerActive, setTimerActive] = useState(false); // Флаг активности таймера

  // Запуск таймера при первом клике
  useEffect(() => 
  {
    if (timerActive) 
    {
      const timer = setInterval(() => 
      {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timerActive]);

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
    if (!timerActive && clicks === 0) 
      setTimerActive(true);
    

    setClicks(prevClicks => prevClicks + 1);

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
    // Подсчет очков
    const score = Math.max(1000 - (time * 10 + clicks * 5), 0);

    const newResult = 
    {
      score,
      date: new Date().toISOString().replace('T', ' ').slice(0, 19),
      time,
      clicks
    };

    // Получение текущих результатов из localStorage
    const storedResults = JSON.parse(localStorage.getItem('memoryGameResults')) || [];
    const updatedResults = [...storedResults, newResult];

    // Сохранение обновленных результатов
    localStorage.setItem('memoryGameResults', JSON.stringify(updatedResults));
  };

  const resetGame = () => 
  {
    setCards(createShuffledIcons().map(icon => ({
      icon,
      isFlipped: false,
      isMatched: false
    })));
    setFlippedIndices([]);
    setClicks(0);
    setTime(0);
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
        <p>Время: {time} сек.</p>
        <p>Клики: {clicks}</p>
        {gameCompleted && <p>Игра завершена! Очки: {Math.max(1000 - (time * 10 + clicks * 5))}</p>}
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