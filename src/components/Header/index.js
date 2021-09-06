import React, { useState, useEffect } from "react";
import Clock from "../../assets/clock.png";
import Flag from "../../assets/flags.png";
import restart from "../../assets/restart.png";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


export default function Header({flagCount, gameOver, showMenu, restartGame}) {
  let [time, setTime] = useState(0);
  const clickMenuHandler = () => {
    showMenu(true)
  }

  useEffect(() => {
    function incrementTime() {
      setTimeout(() => {
        let newTime = time + 1;
        setTime(newTime);
      }, 1000);
    }
    if (!gameOver) {
      incrementTime();
    }
  }, [time]);

  return (
    <div className="header">
      <div className="header-item">
        <img src={Flag} alt={Flag}/>
        <h4>{flagCount}</h4>
      </div>
      <div className="header-item">
        <button onClick={restartGame}><img src={restart} alt={restart}/></button>
      </div>
      <div className="header-item">
        <img src={Clock} alt={Clock}/>
        <h4>{time}</h4>
      </div>
      <IconButton className="menu-btn" onClick={clickMenuHandler}><MenuIcon className="menu-icon"/></IconButton>
    </div>
  );
}
