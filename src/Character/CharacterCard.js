import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";

function CharacterCard({ character }) {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [characterToRemove, setCharacterToRemove] = useState(null);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = favorites.includes(character.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      setCharacterToRemove(character.id);
    } else {
      dispatch(addFavorite(character.id));
    }
  };

  const handleConfirmRemove = () => {
    dispatch(removeFavorite(characterToRemove));
    setCharacterToRemove(null);
  };

  const handleCancelRemove = () => {
    setCharacterToRemove(null);
  };

  return (
    <div className="character-card">
      <h3>{character.name}</h3>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <button onClick={handleFavoriteToggle}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      {characterToRemove && (
        <div className="confirmation-modal">
          <p>
            {character.name} isimli karakteri favorilerden kaldırmak
            istediğinize emin misiniz?
          </p>
          <button onClick={handleConfirmRemove}>Evet</button>
          <button onClick={handleCancelRemove}>Hayır</button>
        </div>
      )}
    </div>
  );
}

export default CharacterCard;
