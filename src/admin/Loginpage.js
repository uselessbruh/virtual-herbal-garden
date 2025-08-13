import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "./loginPage.css";
import BacktoDash from "../components/leftArrow.png";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@vrndvn.in")) {
      setError("you're not allowed access this page");
      return;
    }
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem('rememberMe', rememberMe.toString());

      navigate("/admin-dashboard"); 
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login failed: ", error);
    }
  };

  const handlegotodash = () => {
    navigate("/");
  };

  return (
    <div className="loginpage">
      <div className="backtohomebutton">
        <img src={BacktoDash} onClick={handlegotodash} alt="Back to dashboard" />
      </div>
      <div>
        <section>
          <div className="form-box">
            <div className="form-value">
              <form onSubmit={handleSubmit}>
                <h2>Admin Log In</h2>
                <div className="inputbox">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label>Admin Mail</label>
                </div>
                <div className="inputbox">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label>Password</label>
                </div>
                <div className="forget">
                  <label>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />{" "}
                    Remember me
                  </label>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Log in</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Loginpage;
