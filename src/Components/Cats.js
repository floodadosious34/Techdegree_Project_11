import React, {useState, useEffect} from "react";
import axios from "axios";
import apiKey from "../config";

import PhotoContainer from "./PhotoContainer";

const Cats = () => {
    const query = "Cats";
    const [photos, setPhotos] = useState([]);

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

    return (
        <div className="photo-container">
            {/* Adds a loading message before the images load */}
            {<PhotoContainer data={photos} />}
        </div>
    )
}

export default Cats;