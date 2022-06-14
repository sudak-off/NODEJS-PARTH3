import React from "react";
import image from "./UI/versus.png";
const ArenaComponent = ({
  fighter1Name,
  fighter2Name,
  onKeyDown,
  firstFighterBar,
  secondFighterBar,
  showDamage
}) => {
  return (
    <div className="arena___root" tabIndex="1" onKeyDown={(e) => onKeyDown(e)}>
      <div className="arena___fight-status">
        <div className="arena___fighter-indicator">
          <span className="arena___fighter-name">{fighter1Name}</span>
          <div className="arena___health-indicator">
            <div
              className="arena___health-bar"
              id="left-fighter-indicator"
              ref={firstFighterBar}
            ></div>
          </div>
        </div>

        <div className="arena___versus-sign">
          <img src={image} alt="vs" />
          <div className="arena___damageBlock" ref={showDamage}></div>
        </div>

        <div className="arena___fighter-indicator">
          <span className="arena___fighter-name">{fighter2Name}</span>
          <div className="arena___health-indicator">
            <div
              className="arena___health-bar"
              id="right-fighter-indicator"
              ref={secondFighterBar}
            ></div>
          </div>
        </div>
      </div>

      <div className="arena___battlefield">
        <div className="fighter-preview___root fighter-preview___left">
          <img
            src="https://media.giphy.com/media/kdHa4JvihB2gM/giphy.gif"
            alt="fighter1"
            title={fighter1Name}
            className="fighter-preview___img"
          />
        </div>
        <div className="fighter-preview___root fighter-preview___right arena___right-fighter">
          <img
            src="https://i.pinimg.com/originals/46/4b/36/464b36a7aecd988e3c51e56a823dbedc.gif"
            alt="fighter2"
            title={fighter2Name}
            className="fighter-preview___img"
          />
        </div>
      </div>
    </div>
  );
};

export default ArenaComponent;
