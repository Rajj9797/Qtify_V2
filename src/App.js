import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Card from "./components/Card";
import Song from "./components/Song";
import TopAlbums from "./components/TopAlbums";
import NewAlbums from "./components/NewAlbums";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      {/* <Card /> */}
      <TopAlbums />
      <NewAlbums />
      <Song />
    </div>
  );
}

export default App;
