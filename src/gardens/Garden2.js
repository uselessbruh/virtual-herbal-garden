import React, { useState, useEffect } from 'react';
import "./garden2.css";
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

  const handlechangegardento1=()=>{
    navigate('/garden/plot1')
  }
  const handlechangegardento2=()=>{
    navigate('/garden/plot3')
  }

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

  const plant1 = getPlantById('plant3');
  const plant2 = getPlantById('plant4');
  const plant3 = getPlantById('plant5');

  return (
    <div className='garden2'>
      <div class="gardenexitbutton" onClick={handleexitgarden}><img src={back}/></div>
      <div className='butplant2'>
        <img src={leftarrow} className='arrow2' onClick={handlechangegardento1}/>
        <img src={rightarrow} className='arrow2' onClick={handlechangegardento2}/>
      </div>
      <div className='plants2'>
        <img src={plant1.imgurl} title={plant1.commonname} className='plant21' onClick={()=>handleViewPlants(plant1)}/>
        <img src={plant2.imgurl} title={plant2.commonname} className='plant22' onClick={()=>handleViewPlants(plant2)}/>
        <img src={plant3.imgurl} title={plant3.commonname} className='plant23' onClick={()=>handleViewPlants(plant3)}/>
      </div>
      {isContainerOpen && (
        <PlantDetails plant={selectedPlant} onClose={handleCloseContainer} />
      )}
    </div>

  );
};

export default Garden;
