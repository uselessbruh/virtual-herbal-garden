import React, { useState } from 'react';
import './howareyou.css'; // Import the combined CSS file

function App() {
    const [isSignUp, setIsSignUp] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSwitch = () => {
        setIsSignUp(!isSignUp);
        setErrors({}); // Clear errors when toggling
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateForm = () => {
        const { name, email, password } = formData;
        let valid = true;
        let errors = {};

        if (isSignUp && !name) {
            errors.name = 'Name is required';
            valid = false;
        }
        if (!email) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!validateEmail(email)) {
            errors.email = 'Invalid email format';
            valid = false;
        }
        if (!password) {
            errors.password = 'Password is required';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Proceed with form submission
            console.log('Form Data:', formData);
        }
    };

    return (
        <div className="form-structor">
            <div className={`signup ${isSignUp ? '' : 'slide-up'}`}>
                <h2 className="form-title" id="signup" onClick={handleSwitch}>
                    <span>or</span> Sign up
                </h2>
                <form className="form-holder" onSubmit={handleSubmit}>
                    {isSignUp && (
                        <input
                            type="text"
                            className="input"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    )}
                    <input
                        type="email"
                        className="input"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        className="input"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <div className='signuperrors'>
                    {errors.name && <span className="error1">{errors.name}</span>}
                    {errors.email && <span className="error2">{errors.email}</span>}
                    {errors.password && <span className="error3">{errors.password}</span>}
                    </div>
                    <button className="submit-btn" type="submit">
                        Sign up
                    </button>
                </form>
            </div>
            <div className={`login ${isSignUp ? 'slide-up' : ''}`}>
                <div className="center">
                    <h2 className="form-title" id="login" onClick={handleSwitch}>
                        <span>or</span> Log in
                    </h2>
                    <form className="form-holder" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div className='loginuperrors'>
                        {errors.email && <span className="error2">{errors.email}</span>}
                            {errors.password && <span className="error3">{errors.password}</span>}
                        </div>
                        <button className="submit-btn" type="submit">
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
