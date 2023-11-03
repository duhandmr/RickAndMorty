import React, { useState, useEffect } from "react";
import axios from "axios";
import EpisodeCard from "./EpisodeCard";
import Pagination from "../components/Pagination";
import EpisodeDetailsPopup from "./EpisodeDetailsPopUp";

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const handleEpisodeClick = (episodeId) => {
    setSelectedEpisode(episodeId);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectedEpisode(null); // Sayfa değiştiğinde seçili bölümü sıfırla
  };

  const closePopup = () => {
    setSelectedEpisode(null);
  };

  useEffect(() => {
    const apiUrl = `https://rickandmortyapi.com/api/episode?page=${currentPage}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setEpisodes(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage]);

  return (
    <div className="episodes-container">
      <h1>Rick and Morty Episodes</h1>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id} onClick={() => handleEpisodeClick(episode.id)}>
            <EpisodeCard episode={episode} />
          </li>
        ))}
      </ul>
      {selectedEpisode && (
        <div className="popup">
          <EpisodeDetailsPopup episodeId={selectedEpisode} onClose={closePopup} />
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={3}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Episodes;
