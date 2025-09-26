import React, { useEffect, useState } from "react";
import CardMusic from "./CardMusic";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Typography, Button } from "@mui/material";
import Carousel from "./Carousel/Carousel";


const Card = () => {
  const [topAlbumCard, setTopAlbumCard] = useState([]);
  const [newAlbumCard, setNewAlbumCard] = useState([]);
  const [isTopAlbumCollapsed, setIsTopAlbumCollapsed] = useState(true);
  const [isNewAlbumCollapsed, setIsNewAlbumCollapsed] = useState(true);

  const fetchCardMusic = async (url) => {
    try {
      const resp = await axios.get(url);
      const cards = resp.data;
      return cards;
    } catch (err) {
      console.error("Error fetching card music:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const topAlbumData = await fetchCardMusic(
        `https://qtify-backend.labs.crio.do/albums/top`
      );
      const newAlbumData = await fetchCardMusic(
        `https://qtify-backend.labs.crio.do/albums/new`
      );
      setTopAlbumCard(topAlbumData);
      setNewAlbumCard(newAlbumData);
    };

    fetchData();
  }, []);

  const handleTopAlbumCollapse = () => {
    setIsTopAlbumCollapsed(!isTopAlbumCollapsed);
  };

  const handleNewAlbumCollapse = () => {
    setIsNewAlbumCollapsed(!isNewAlbumCollapsed);
  };

  return (
    <>
      <div className="albums album-bar">
        <h5>Top Albums</h5>
        <Button onClick={handleTopAlbumCollapse}>
          {isTopAlbumCollapsed ? "Show All" : "Collapse"}
        </Button>
      </div>
      {isTopAlbumCollapsed ? (
        <Carousel
          data={topAlbumCard}
          renderCardComponent={(cardItem) => (
            <CardMusic card={cardItem} className="cards" />
          )}
        />
      ) : (
        <Grid container spacing={2} className="albums">
          {topAlbumCard.map((cardItem) => (
            <Grid item key={cardItem.id} xs={6} sm={4} md={3} lg={2}>
              <CardMusic card={cardItem} className="cards" />
            </Grid>
          ))}
        </Grid>
      )}

      <div className="albums album-bar">
        <h5>New Albums</h5>
        <Button onClick={handleNewAlbumCollapse}>
          {isNewAlbumCollapsed ? "Show All" : "Collapse"}
        </Button>
      </div>
      {isNewAlbumCollapsed ? (
        <Carousel
          data={newAlbumCard}
          renderCardComponent={(cardItem) => (
            <CardMusic card={cardItem} className="cards" />
          )}
        />
      ) : (
        <Grid container spacing={2} className="albums">
          {newAlbumCard.map((cardItem) => (
            <Grid item key={cardItem.id} xs={6} sm={4} md={3} lg={2}>
              <CardMusic card={cardItem} className="cards" />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Card;