import React, { useState, useRef, useEffect } from 'react';
import './viewed.css';

const ChatOption = ({ plant, onClose }) => {
  const [isMedImgOpen, setIsMedImgOpen] = useState(false);
  const medImgRef = useRef(null);

  const handleMedImgClick = () => {
    setIsMedImgOpen(true);
  };
  

  const handleClickOutside = (event) => {
    if (medImgRef.current && !medImgRef.current.contains(event.target)) {
      setIsMedImgOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!plant) return null;

  return (
    <div className='viewplantcontainer'>
      <button className='close-btn' onClick={onClose}>X</button>
      <div className='plantimages'>
        <img src={plant.imgurl} className='plantimg' />
        <img
          src={plant.medimgurl}
          className='medimg'
          onClick={handleMedImgClick}
        />
      </div>

      {isMedImgOpen && (
        <div className='medimg-container' ref={medImgRef}>
          <h3>REMEDY</h3>
          <p dangerouslySetInnerHTML={{ __html: plant.remedy.split(/[@.]/).join('<br/><br/>') }} />
        </div>
      )}

      <div className='plantinformation'>
        <div className='smallline'>
          <p><b>COMMON NAME:</b> {plant.commonname}</p>
        </div>
        <div className='smallline'>
          <p><b>SCIENTIFIC NAME:</b> {plant.scientificname}</p>
        </div>
        <div className='smallline'>
          <p><b>FAMILY NAME:</b> {plant.familyname}</p>
        </div>
        <div className='textspacebetween'>
          <h2>PLANT DESCRIPTION</h2>
          <p>{plant.description}</p>
        </div>
        <div className='textspacebetween'>
          <h2>USES</h2>
          <p dangerouslySetInnerHTML={{ __html: plant.uses.split('.').join('<br/><br/>') }} />
        </div>
        <div className='textspacebetween'>
          <h2>GROWTH CONDITIONS</h2>
          <p>{plant.growthconditions}</p>
        </div>
        <div className='textspacebetween'>
          <h2>PROPAGATION</h2>
          <p>{plant.propagation}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatOption;
