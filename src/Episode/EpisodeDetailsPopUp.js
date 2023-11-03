import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CharacterDetails from "../Character/CharacterDetails";

const EpisodeDetailsPopup = ({ episodeId, onClose }) => {
  const [episode, setEpisode] = useState(null);
  const popupRef = useRef();

  useEffect(() => {
    const apiUrl = `https://rickandmortyapi.com/api/episode/${episodeId}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setEpisode(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [episodeId]);

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (!episode) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="popup-container">
      <div className="popup-content" ref={popupRef}>
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>{episode.name}</h2>
        <p>Episode: {episode.episode}</p>
        <p>Air Date: {episode.air_date}</p>
        <p>Characters:</p>
        <ul>
          {episode.characters.map((characterUrl) => (
            <li key={characterUrl}>
              <CharacterDetails characterUrl={characterUrl} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EpisodeDetailsPopup;
