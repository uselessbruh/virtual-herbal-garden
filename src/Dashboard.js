import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import PlantDetail from "./gardens/Viewed";
import "./dashboard.css";
import adminlogo from "./components/admin.png";
import burgerlogo from "./components/burger.png";
import Chatbot from "./components/chatbot.png";
import MultiChat from "./components/multichat.png";
import InfoIcon from "./components/infoicon.png";
import ShopIcon from "./components/shop.png";
import RestrictGarden from "./components/restrictgarden.png"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const db = getFirestore();

  const handleSearchChange = (e) => setSearch(e.target.value);

  const toggleDropdown = () => {
    setIsExploreOpen(!isExploreOpen);
  };

  const handleSearch = async () => {
    if (search.trim() === "") {
      setResults([]);
      return;
    }
    const plantsCollection = collection(db, "plants");
    const querySnapshot = await getDocs(plantsCollection);

    const filteredResults = querySnapshot.docs
      .filter(
        (doc) =>
          doc.data().commonname.toLowerCase().includes(search.toLowerCase()) ||
          doc.data().uses.toLowerCase().includes(search.toLowerCase()) ||
          doc
            .data()
            .scientificname.toLowerCase()
            .includes(search.toLowerCase()) ||
          doc.data().familyname.toLowerCase().includes(search.toLowerCase())
      )
      .map((doc) => doc.data());

    setResults(filteredResults);
  };

  const handleClick = (plant) => {
    setSelectedPlant(plant);
    setSearch("");
    setResults([]);
  };

  const handleEnterGarden = () => {
    navigate("/garden/plot1");
  };

  const handleadminlogin = async () => {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    if (rememberMe) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/admin-dashboard");
        } else {
          navigate("/admin-login");
        }
      });

    } else {
      navigate("/admin-login");
    }
  };

  const handleshopiconclick = () => {
    navigate("/shopping");
  };

  const handleCloseDetail = () => {
    setSelectedPlant(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExploreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboardcontent">
      <div className="adminlogodiv" title="admin log-in" onClick={handleadminlogin} >
        <img src={adminlogo} />
      </div>
      <div className="resctictedgarden" title="rescticted garden" onClick={handleadminlogin} >
        <img src={RestrictGarden} />
      </div>
      <div ref={dropdownRef} className="dropdown-container">
        <button onClick={toggleDropdown} className="dropdown-button">
          <img src={burgerlogo} title="MORE" />
        </button>
        <div className={`dropdown-menu ${isExploreOpen ? "open" : "closed"}`}>
          <div className="dropdownimg">
            <img src={Chatbot} title="ChatBot" />
          </div>
          <div className="dropdownimg">
            <img src={MultiChat} title="Message" />
          </div>
          <div className="dropdownimg">
            <img src={ShopIcon} title="Shop" onClick={handleshopiconclick} />
          </div>
          <div className="dropdownimg">
            <img src={InfoIcon} title="More Info" />
          </div>
        </div>
      </div>
      <div className="maindiv">
        <div className="searchtitle">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search for plants"
            className="searchbar"
          />
          <button onClick={handleSearch} className="searchbutton">
            Search
          </button>
        </div>

        <div className="results-container">
          {results.length > 0 ? (
            results.map((plant, index) => (
              <div
                key={index}
                className="result-item"
                onClick={() => handleClick(plant)}
              >
                <h2>{plant.commonname}</h2>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>

        {selectedPlant && (
          <PlantDetail plant={selectedPlant} onClose={handleCloseDetail} />
        )}

        <div className="entergardenbutton">
          <button onClick={handleEnterGarden} className="underbutton">
            Enter Garden
          </button>
        </div>

        <div className="gardentitle">
          <h1 className="breathing-text">
            <span>V</span>
            <span>I</span>
            <span>R</span>
            <span>T</span>
            <span>U</span>
            <span>A</span>
            <span>L</span>
            <span><pre> </pre></span>
            <span></span>
            <span>H</span>
            <span>E</span>
            <span>R</span>
            <span>B</span>
            <span>A</span>
            <span>L</span>
            <span><pre> </pre></span>
            <span></span>
            <span>G</span>
            <span>A</span>
            <span>R</span>
            <span>D</span>
            <span>E</span>
            <span>N</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
