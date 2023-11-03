import React, { useState } from "react";
import Episodes from "./Episode/Episodes";
import CharacterList from "./Character/CharacterList";

function App() {
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [showCharacterList, setShowCharacterList] = useState(false);

  const toggleEpisodes = () => {
    setShowEpisodes(!showEpisodes);
    setShowCharacterList(false);
  };

  const toggleCharacterList = () => {
    setShowCharacterList(!showCharacterList);
    setShowEpisodes(false);
  };

  return (
    <div className="App">
      <button className="episode-btn" onClick={toggleEpisodes}>
        For All Episodes Click
      </button>
      <button className="character-btn" onClick={toggleCharacterList}>
        For All Characters Click
      </button>
      {showEpisodes && <Episodes />}
      {showCharacterList && <CharacterList />}
    </div>
  );
}

export default App;