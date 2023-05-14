import React, { useState, useEffect } from "react";

const SongSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${searchTerm}&entity=song&limit=10`
        );
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    if (searchTerm !== "") {
      fetchSongs();
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Enter search term"
      />

      <ul>
        {results.map((song) => (
          <li key={song.trackId}>
            {song.trackName} - {song.artistName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongSearch;
