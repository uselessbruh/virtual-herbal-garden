import React, { useState, useEffect } from 'react';
import "./garden1.css";
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
    navigate('/garden/plot2');
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

  const plant1 = getPlantById('plant1');
  const plant2 = getPlantById('plant2');

  return (
    <div className='garden1'>
      <div class="gardenexitbutton" onClick={handleexitgarden}><img src={back}/></div>
      <div className='butplant1'>
        <img src={leftarrow} className='left-arrow1' />
        <img src={rightarrow} className='right-arrow1' onClick={handleChangeGarden} />
      </div>
      <div className='plants1'>
        <img src={plant1.imgurl} title={plant1.commonname} className='plant11' onClick={() => handleViewPlants(plant1)} />
        <img src={plant2.imgurl} title={plant2.commonname} className='plant12' onClick={() => handleViewPlants(plant2)} />
      </div>
      {isContainerOpen && (
        <PlantDetails plant={selectedPlant} onClose={handleCloseContainer} />
      )}
    </div>
  );
};

export default Garden;
