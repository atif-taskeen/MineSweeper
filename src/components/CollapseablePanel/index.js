import React from "react";
import Accordians from "../Accordians";

const CollapseablePanel = ({ gameTypeSetter, gameType, encode, ImportHandler }) => {

  return (
    <div className="accordian">
      <Accordians
        variant="Game"
        gameTypeSetter={gameTypeSetter}
        gameType={gameType}
        expand='panel1'
      />
      <Accordians
        variant="Export"
        expand='panel2'
        encode={encode}
      />
      <Accordians
        variant="Import"
        expand='panel3'
        ImportHandler={ImportHandler}
      />
    </div>
  );
};

export default CollapseablePanel;
