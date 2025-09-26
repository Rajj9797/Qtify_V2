import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Tabs, Tab } from "@mui/material";
import CardMusic from "./CardMusic";
import axios from "axios";
import Carousel from "./Carousel/Carousel";

const Song = () => {
  const [song, setSong] = useState([]);
  const [genre, setGenre] = useState([]);
  const [filterSong, setFilterSong] = useState([]);
  const [isCardCollapsed, setIsCardCollapsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const songs = await axios.get(`https://qtify-backend.labs.crio.do/songs`);
      const genres = await axios.get(
        `https://qtify-backend.labs.crio.do/genres`
      );
      setSong(songs.data);
      console.log(songs.data, "songs data");
      setGenre(genres.data);
      setFilterSong(songs.data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const match = e.target.id;
    if (match === "all") {
      setFilterSong(song);
      return;
    }
    const filtered = song.filter((item) => item.genre.key === match);
    setFilterSong(filtered);
  };

  return (
    <>
      <div className="albums album-bar">
        <h5>Songs</h5>
      </div>
      <div className="albums album-bar">
        <Tabs onChange={handleChange}>
          <Tab key="all" id="All" label="All" wrapped />
          {genre.data &&
            genre.data.map((item, index) =>
              (
                <Tab
                  key={item.key}
                  id={item.key}
                  label={item.label}
                  wrapped
                />
              )
            )}
        </Tabs>
      </div>
      {/* <Grid container spacing={2} className="albums">
        {filterSong.map((cardItem, index) => (
          <Grid item key={cardItem.id} xs={6} sm={4} md={3} lg={2}>
            <CardMusic card={cardItem} className="cards" />
          </Grid>
        ))}
      </Grid> */}
      {/* <Grid container spacing={2} className="albums">
        {filterSong.map((cardItem, index) => (
          <Grid item key={cardItem.id} xs={6} sm={4} md={3} lg={2}>
            <Carousel
              data={filterSong}
              renderCardComponent={(cardItem) => (
                <CardMusic card={cardItem} className="cards" />
              )}
            />
          </Grid>
        ))}
      </Grid> */}
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
