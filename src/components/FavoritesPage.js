import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/favoritesSlice';
import axios from 'axios';

function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  const getCharacterById = async (characterId) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
      return response.data;
    } catch (error) {
      console.error('Karakter bilgileri alınamadı:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      const characterDetails = await Promise.all(favorites.map((characterId) => getCharacterById(characterId)));
      setFavoriteCharacters(characterDetails);
    };

    fetchCharacterDetails();
  }, [favorites]);

  const handleRemoveFavorite = (characterId) => {
    dispatch(removeFavorite(characterId));
  };

  return (
    <div>
      <h2>Favori Karakterler</h2>
      <ul>
        {favoriteCharacters.map((character) => (
          <li key={character.id}>
            <p>Karakter Adı: {character.name}</p>
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
            <button onClick={() => handleRemoveFavorite(character.id)}>
              Favorilerden Kaldır
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;
