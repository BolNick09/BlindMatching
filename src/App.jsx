import { useState } from 'react'
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

  // Изменил логику создания перемешанной коллекции
  const createShuffledIcons = () => 
  {
    const pairs = [...icons, ...icons];
    return pairs.sort(() => Math.random() - 0.5);
  };
  //Cards - текущее значение состояния, setCards - функция изменения состояния
  //createShuffledIcons - задание начального состояния
  const [cards, setCards] = useState(createShuffledIcons().map(icon => 
  ({
    icon,
    isFlipped: false,
    isMatched: false
  })));
  const [flippedIndices, setFlippedIndices] = useState([]);

  const handleCardClick = (index) => 
  {
    //Пропуск, если уже открыты
    if (cards[index].isFlipped || flippedIndices.length >= 2 || cards[index].isMatched) 
      return;
    

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    //Проверка на совпадение
    if (newFlippedIndices.length === 2) 
    {
      const [firstIndex, secondIndex] = newFlippedIndices;
      // Совпадение - оставляю открытыми

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

  const resetGame = () => 
  {
    setCards(createShuffledIcons().map(icon => 
    ({
      icon,
      isFlipped: false,
      isMatched: false
    })));
    setFlippedIndices([]);
  };

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        {
          cards.map((card, index) => 
            (
              <Card
                key={index}
                icon={card.icon}
                isFlipped={card.isFlipped || card.isMatched}
                onClick={() => handleCardClick(index)}
              />
            ))}
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