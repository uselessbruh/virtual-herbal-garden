import React, { useState, useEffect }  from 'react';
import "./garden3.css";
import leftarrow from "../components/leftArrow.png";
import rightarrow from "../components/rightArrow.png";
import back from "../components/crossbutton.png"
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import PlantDetails from './Viewed';

const Garden = () => {

  const navigate=useNavigate();
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

  const handlechangegardento2=()=>{
    navigate('/garden/plot2')
  }
  const handlechangegardento4=()=>{
    navigate('/garden/plot4')
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

  const plant1 = getPlantById('plant6');
  const plant2 = getPlantById('plant7');

  return (
    <div className='garden3'>
     <div class="gardenexitbutton" onClick={handleexitgarden}><img src={back}/></div>
      <div className='butplant3'>
        <img src={leftarrow} className='arrow3' onClick={handlechangegardento2}/>
        <img src={rightarrow} className='arrow3'onClick={handlechangegardento4}/>
      </div>
      <div className='plants3'>
        <img src={plant1.imgurl} title={plant1.commonname} className='plant31' onClick={() => handleViewPlants(plant1)} />
        <img src={plant2.imgurl} title={plant2.commonname} className='plant32' onClick={() => handleViewPlants(plant2)}/>
      </div>
      {isContainerOpen && (
        <PlantDetails plant={selectedPlant} onClose={handleCloseContainer} />
      )}
    </div>

  );
};

export default Garden;
