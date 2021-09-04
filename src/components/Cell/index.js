import React from "react";
import "../../App.css";
import Bomb from "../../assets/bomb.png";
import Flag from "../../assets/flags.png";

export default function Cell({ details, updateFlag, revealCell }) {
  const cellstyle = {
    background: details.revealed
      ? "#52529e"
      : "#8181de",
    color: numColorCode(details.value),
  };

  return (
    <div
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      onClick={() => revealCell(details.x, details.y)}
      style={cellstyle}
      className="cellStyle"
    >
      {!details.revealed && details.flagged ? (
        <img className="flag-img" src={Flag} alt="Flag"/>
      ) : details.revealed && details.value !== 0 ? (
        details.value === "X" ? (
          <img src={Bomb} alt="bomb"/>
        ) : (
          details.value
        )
      ) : (
        ""
      )}
    </div>
  );
}

const numColorCode = (num) => {
  if (num === 1) {
    return "#1976d2";
  } else if (num === 2) {
    return "#388d3c";
  } else if (num === 3) {
    return "#d33030";
  } else if (num === 4) {
    return "#7c21a2";
  } else if (num === 5) {
    return "#1976d2";
  } else if (num === 6) {
    return "#1976d2";
  } else {
    return "white";
  }
};
