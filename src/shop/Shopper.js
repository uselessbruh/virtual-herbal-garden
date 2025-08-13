import React, { useState } from 'react';
import './shopper.css'; 

const ChairProductPage = () => {
   
    const [selectedDesc, setSelectedDesc] = useState('desc-1');
    const [selectedColor, setSelectedColor] = useState('color-1');

    const handleDescChange = (e) => setSelectedDesc(e.target.id);
    const handleColorChange = (e) => setSelectedColor(e.target.id);

    return (
        <div className="section-fluid-main">
            <div className="section">
                <div className="info-wrap mob-margin">
                    <p className="title-up">Modern chair</p>
                    <h2>Sella Gastro</h2>
                    <h4>$174 <span>$237</span></h4>

                    {/* Description/Details Toggle */}
                    <div className="section-fluid">
                        <input
                            className="desc-btn"
                            type="radio"
                            id="desc-1"
                            name="desc-btn"
                            checked={selectedDesc === 'desc-1'}
                            onChange={handleDescChange}
                        />
                        <label htmlFor="desc-1">Description</label>

                        <input
                            className="desc-btn"
                            type="radio"
                            id="desc-2"
                            name="desc-btn"
                            checked={selectedDesc === 'desc-2'}
                            onChange={handleDescChange}
                        />
                        <label htmlFor="desc-2">Details</label>

                        {/* Description Section */}
                        {selectedDesc === 'desc-1' && (
                            <div className="section-fluid desc-sec accor-1">
                                <p>
                                    The chair construction is made of ash tree. Upholstery and wood color at customer's request.
                                </p>
                            </div>
                        )}

                        {/* Details Section */}
                        {selectedDesc === 'desc-2' && (
                            <div className="section-fluid desc-sec accor-2">
                                <div className="section-inline">
                                    <p><span>76</span>cm<br />Length</p>
                                </div>
                                <div className="section-inline">
                                    <p><span>68</span>cm<br />Width</p>
                                </div>
                                <div className="section-inline">
                                    <p><span>87</span>cm<br />Height</p>
                                </div>
                                <div className="section-inline">
                                    <p><span>10</span>kg<br />Weight</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Upholstery Options */}
                    <h5>Choose upholstery:</h5>
                </div>

                <div className="clearfix"></div>

                {/* Color Selection */}
                <input
                    className="color-btn for-color-1"
                    type="radio"
                    id="color-1"
                    name="color-btn"
                    checked={selectedColor === 'color-1'}
                    onChange={handleColorChange}
                />
                <label className="first-color" htmlFor="color-1"></label>

                <input
                    className="color-btn for-color-2"
                    type="radio"
                    id="color-2"
                    name="color-btn"
                    checked={selectedColor === 'color-2'}
                    onChange={handleColorChange}
                />
                <label className="color-2" htmlFor="color-2"></label>

                <input
                    className="color-btn for-color-3"
                    type="radio"
                    id="color-3"
                    name="color-btn"
                    checked={selectedColor === 'color-3'}
                    onChange={handleColorChange}
                />
                <label className="color-3" htmlFor="color-3"></label>

                <input
                    className="color-btn for-color-4"
                    type="radio"
                    id="color-4"
                    name="color-btn"
                    checked={selectedColor === 'color-4'}
                    onChange={handleColorChange}
                />
                <label className="color-4" htmlFor="color-4"></label>

                <input
                    className="color-btn for-color-5"
                    type="radio"
                    id="color-5"
                    name="color-btn"
                    checked={selectedColor === 'color-5'}
                    onChange={handleColorChange}
                />
                <label className="color-5" htmlFor="color-5"></label>

                <input
                    className="color-btn for-color-6"
                    type="radio"
                    id="color-6"
                    name="color-btn"
                    checked={selectedColor === 'color-6'}
                    onChange={handleColorChange}
                />
                <label className="color-6" htmlFor="color-6"></label>

                <div className="clearfix"></div>

                {/* Add to Cart Button */}
                <div className="info-wrap">
                    <a href="#" className="btn">
                        <i className="uil uil-shopping-cart icon"></i> Add To Cart
                    </a>
                </div>

                {/* Image Rendering based on color selection */}
                <div className={`img-wrap chair-1 ${selectedColor === 'color-1' ? 'visible' : 'hidden'}`}></div>
                <div className={`img-wrap chair-2 ${selectedColor === 'color-2' ? 'visible' : 'hidden'}`}></div>
                <div className={`img-wrap chair-3 ${selectedColor === 'color-3' ? 'visible' : 'hidden'}`}></div>
                <div className={`img-wrap chair-4 ${selectedColor === 'color-4' ? 'visible' : 'hidden'}`}></div>
                <div className={`img-wrap chair-5 ${selectedColor === 'color-5' ? 'visible' : 'hidden'}`}></div>
                <div className={`img-wrap chair-6 ${selectedColor === 'color-6' ? 'visible' : 'hidden'}`}></div>

                {/* Background color change */}
                <div className="back-color"></div>
                <div className={`back-color chair-2 ${selectedColor === 'color-2' ? 'visible' : 'hidden'}`}></div>
                <div className={`back-color chair-3 ${selectedColor === 'color-3' ? 'visible' : 'hidden'}`}></div>
                <div className={`back-color chair-4 ${selectedColor === 'color-4' ? 'visible' : 'hidden'}`}></div>
                <div className={`back-color chair-5 ${selectedColor === 'color-5' ? 'visible' : 'hidden'}`}></div>
                <div className={`back-color chair-6 ${selectedColor === 'color-6' ? 'visible' : 'hidden'}`}></div>

                {/* Logo Link */}
                <a href="https://front.codes/" className="logo" target="_blank" rel="noopener noreferrer">
                    <img src="https://assets.codepen.io/1462889/fcy.png" alt="logo" />
                </a>
            </div>
        </div>
    );
};

export default ChairProductPage;
