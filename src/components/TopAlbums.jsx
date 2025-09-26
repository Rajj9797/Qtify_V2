import React, { useEffect, useState } from "react";
import CardMusic from "./CardMusic";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Carousel from "./Carousel/Carousel";
import axios from "axios";

const TopAlbums = () => {
  const [topAlbumCard, setTopAlbumCard] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const fetchTopAlbums = async () => {
      try {
        const resp = await axios.get(
          "https://qtify-backend.labs.crio.do/albums/top"
        );
        setTopAlbumCard(resp.data);
      } catch (err) {
        console.error("Error fetching top albums:", err);
      }
    };
    fetchTopAlbums();
  }, []);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className="albums album-bar">
        <h5>Top Albums</h5>
        <Button onClick={handleCollapse}>
          {isCollapsed ? "Show All" : "Collapse"}
        </Button>
      </div>
      {isCollapsed ? (
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
    </>
  );
};

export default TopAlbums;