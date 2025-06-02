import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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



function App() 
{
console.clear();

const counter = 
{
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0
}

function randint(maxn) 
{
  let result = -1;
  do 
  {
    result = Math.floor(Math.random() * (maxn - 1));
    console.log (`result = ${result}, counter = ${counter[result]}`)

    if (counter[result] < 2)
    {
      counter[result]++;   
      return result;    
    }

  }
  while (true); 

}

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
  const iconsR1 = 
  [
    icons[randint(9)], 
    icons[randint(9)],
    icons[randint(9)],
    icons[randint(9)]
  ]
  const iconsR2 = 
  [
    icons[randint(9)], 
    icons[randint(9)],
    icons[randint(9)],
    icons[randint(9)]
  ]
  const iconsR3 = 
  [
    icons[randint(9)], 
    icons[randint(9)],
    icons[randint(9)],
    icons[randint(9)]
  ]
  const iconsR4 = 
  [
    icons[randint(9)], 
    icons[randint(9)],
    icons[randint(9)],
    icons[randint(9)]
  ]



  return (
    <>
    <div>
    {
      iconsR1.map
      (
        (IconComponent, index) => 
          (
            <span key={index} style={{ fontSize: '5rem' }}>
              <IconComponent/>
            </span>
          )
      )
    }
    </div>
    <div>
    {
      iconsR2.map
      (
        (IconComponent, index) => 
          (
            <span key={index} style={{ fontSize: '5rem' }}>
              <IconComponent/>
            </span>
          )
      )
    }
    </div>
    <div>
    {
      iconsR3.map
      (
        (IconComponent, index) => 
          (
            <span key={index} style={{ fontSize: '5rem' }}>
              <IconComponent/>
            </span>
          )
      )
    }
    </div>
    <div>
    {
      iconsR4.map
      (
        (IconComponent, index) => 
          (
            <span key={index} style={{ fontSize: '5rem' }}>
              <IconComponent/>
            </span>
          )
      )
    }
    </div>
    </>
  );
}

export default App