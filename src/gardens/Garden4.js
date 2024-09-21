import React, { useState, useEffect } from 'react';
import "./garden4.css";
import leftarrow from "../components/leftArrow.png";
import rightarrow from "../components/rightArrow.png";
import back from "../components/crossbutton.png"
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import PlantDetails from './Viewed';

const Garden = () => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [isContainerOpen, setIsContainerOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const handleViewPlants = (plant) => {
    setSelectedPlant(plant);
    setIsContainerOpen(true);
  };

  const handleCloseContainer = () => {
    setIsContainerOpen(false);
    setSelectedPlant(null);
  };

  const handleChangeGarden = () => {
    navigate('/garden/plot3');
  };

  const handleexitgarden=()=>{
    navigate('/');
  };

  useEffect(() => {
    const fetchPlantsData = async () => {
      const querySnapshot = await getDocs(collection(db, "plants"));
      const plantsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlants(plantsData);
    };

    fetchPlantsData();
  }, []);

  const getPlantById = (id) => {
    return plants.find(plant => plant.id === id) || {};
  };

  const plant1 = getPlantById('plant8');
  const plant2 = getPlantById('plant9');
  const plant3 = getPlantById('plant10');

  return (
    <div className='garden4'>
     <div class="gardenexitbutton" onClick={handleexitgarden}><img src={back}/></div>
      <div className='butplant4'>
        <img src={leftarrow} className='left-arrow4' onClick={handleChangeGarden}/>
        <img src={rightarrow} className='right-arrow4'  />
      </div>
      <div className='plants4'>
        <img src={plant1.imgurl} title={plant1.commonname} className='plant41' onClick={() => handleViewPlants(plant1)} />
        <img src={plant2.imgurl} title={plant2.commonname} className='plant42' onClick={() => handleViewPlants(plant2)} />
        <img src={plant3.imgurl} title={plant3.commonname} className='plant43' onClick={() => handleViewPlants(plant3)} />
      </div>
      {isContainerOpen && (
        <PlantDetails plant={selectedPlant} onClose={handleCloseContainer} />
      )}
    </div>
  );
};

export default Garden;
