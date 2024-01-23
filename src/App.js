import './App.css';
import apiKey from './config';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';

//App Components
import SearchForm from "./Components/SearchForm";
import MainNav from "./Components/Nav";
import PhotoContainer from './Components/PhotoContainer';
import Cats from './Components/Cats';
import Dogs from './Components/Dogs';
import Computers from './Components/Computers';

const App = () => {

  const [query, setQuery] = useState("jazz");
  const [photos, setPhotos] = useState([]);

  const navigateToSearch = useNavigate();

  useEffect(() => {
    let activeFetch = true;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&tags=${query}&per_page=24&api_key=${apiKey}&format=json&nojsoncallback=1`)
      .then(response => {
        if (activeFetch) {
          setPhotos(response.data.photos.photo)
          console.log(response)
        }
      })
      .catch(error => {
        console.log("Error, error")
      })
      return () => {activeFetch = false}
  }, [query]);

  const handleQueryChange = searchInput => {
    setQuery(searchInput);
    navigateToSearch(`/search/${searchInput}`);
  }
  
  return (
    <div className="container">
      {/* <Search />
      <Nav /> */}
      <SearchForm changeQuery={handleQueryChange} />
      <MainNav />
      <Routes>
        <Route path="/" element={<PhotoContainer data={photos} />} />
        <Route path="/search/:searchText" element={<PhotoContainer data={photos} />} />
        <Route path="/cats" element={<Cats />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/computers" element={<Computers />} />
      </Routes>
    </div>
  );
}

export default App;
