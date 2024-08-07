import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Saved from './components/Saved.jsx'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const API_KEY = "6DGz8FpdhtOSSoaufafUDeaFa3nysIY0z8SttpcBzvutnVI2ii1JGvEG"
  // const URL="https://api.pexels.com/v1/search?query=nature&per_page=1"

  const [images, setImages] = useState([])
  const [search, setSearch] = useState("nature");
  const [loader, setLoader] = useState(true);
  const [saved, setSaved] = useState([]);


  useEffect(() => {
    const fetchImage = async () => {
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${search}&per_page=80`,
        {
          headers: {
            Authorization: API_KEY
          },
        }
      );
      setImages(res.data.photos);
      setLoader(false);
      // console.log(images);
    };

    const data=JSON.parse(localStorage.getItem("Images"))
    if(data){
      setSaved(data)
    }
    
    fetchImage();
  }, [search])

  useEffect(() => {
    if(saved.length!=0){
      const json=JSON.stringify(saved)
      localStorage.setItem("Images",json)
    }
  }, [saved])
  

  console.log("image is saved",saved);

  return (
    <>
      <Router>
        <Navbar setSearch={setSearch} />
        <Routes>
          <Route path='/' element={<Home images={images}
            loader={loader} 
            saved={saved}
            setSaved={setSaved} />} />
          <Route path='/saved' element={<Saved 
          saved={saved} loader={loader}
          />} />
        </Routes>
      </Router>
    </>
  )
}

export default App