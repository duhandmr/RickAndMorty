import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterDetails = ({ characterUrl }) => {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    axios
      .get(characterUrl)
      .then((response) => {
        setCharacter(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [characterUrl]);

  if (!character) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h2>{character.name}</h2>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
    </div>
  );
};

export default CharacterDetails;
