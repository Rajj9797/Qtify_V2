import React, { useState, useEffect } from "react";
import { Typography, Tabs, Tab } from "@mui/material";
import CardMusic from "./CardMusic";
import axios from "axios";
import Carousel from "./Carousel/Carousel";

const Song = () => {
  const [song, setSong] = useState([]);
  const [genre, setGenre] = useState([]);
  const [filterSong, setFilterSong] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const songs = await axios.get("https://qtify-backend.labs.crio.do/songs");
      const genres = await axios.get("https://qtify-backend.labs.crio.do/genres");
      setSong(songs.data);
      setGenre(genres.data);
      setFilterSong(songs.data);
    };
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === "all") {
      setFilterSong(song);
    } else {
      const filtered = song.filter((item) => item.genre.key === newValue);
      setFilterSong(filtered);
    }
  };

  return (
    <>
      <div className="albums album-bar">
        <h5>Songs</h5>
      </div>
      <div className="albums album-bar">
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab key="all" value="all" id="all" label="All" wrapped />
          {genre.data &&
            genre.data.map((item) => (
              <Tab
                key={item.key}
                value={item.key}
                id={item.key}
                label={item.label}
                wrapped
              />
            ))}
        </Tabs>
      </div>
      <Carousel
        data={filterSong}
        renderCardComponent={(cardItem) => (
          <CardMusic card={cardItem} className="cards" />
        )}
      />
    </>
  );
};

export default Song;