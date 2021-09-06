import React from "react";
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CollapseablePanel from "../CollapseablePanel";

const Menu = ({ showMenu, hideMenu, gameTypeSetter, gameType, encode, ImportHandler}) => {
  const clickMenuHandler = () => {
    hideMenu(false)
  }
  return (
    <div className={`menu-wrapper ${showMenu ? 'show-menu' : 'hide-menu'}`}>
      {showMenu && (
        <>
          <IconButton className="clear-icon" onClick={clickMenuHandler}><ClearIcon/></IconButton>
          <div className="clear-both"></div>
          <CollapseablePanel
            gameTypeSetter={gameTypeSetter}
            gameType={gameType}
            encode={encode}
            ImportHandler={ImportHandler}
          />
        </>
      )}
    </div>
  );
};

export default Menu;
