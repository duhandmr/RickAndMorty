import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from './CharacterCard';
import Pagination from '../components/Pagination';
import FavoritesPage from '../components/FavoritesPage';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const apiUrl = `https://rickandmortyapi.com/api/character?page=${currentPage}`;

    axios.get(apiUrl)
      .then((response) => {
        setCharacters(response.data.results);
        setTotalPages(Math.ceil(response.data.info.count / response.data.info.pages));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage]);

  useEffect(() => {
    const filtered = characters.filter((character) => {
      return character.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredCharacters(filtered);
  }, [characters, searchTerm]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Character List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredCharacters.map((character) => (
          <li key={character.id}>
            <CharacterCard character={character} />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <FavoritesPage />
    </div>
  );
};

export default CharacterList;
