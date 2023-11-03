import React from 'react';

const EpisodeCard = ({ episode }) => {
  return (
    <div className="episode-card">
      <h2>{episode.name}</h2>
      <p>Episode: {episode.episode}</p>
      <p>Air Date: {episode.air_date}</p>
    </div>
  );
};

export default EpisodeCard;
