import React, { useState, useEffect } from 'react';
import './Forms.css'; // Import the CSS
import useLogin from './hooks/useLogin.js';
import useSignup from './hooks/useSignup.js';

const Forms = ({ onViewSwitch }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // To toggle the visibility of the password
  const [captcha, setCaptcha] = useState(''); // Store CAPTCHA value
  const [userCaptcha, setUserCaptcha] = useState(''); // Store user's CAPTCHA input
  const [captchaError, setCaptchaError] = useState(false); // Track CAPTCHA errors
  const [userLoginData,setUserLoginData] = useState({
    phNo:"",
    password:"",
  });
  const [userSignupData,setUserSignupData] = useState({
    name:"",
    phNo:"",
    password:"",
  });
  
  const {loginLoading,login} = useLogin();
  const {signupLoading,Signup} = useSignup();

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState); // Toggle the password visibility
  };

  const handleLogin = () => {
    if (userCaptcha === captcha) {
      // After successful signin, switch to MainFeed view
      onViewSwitch('MainFeed');
    } else {
      setCaptchaError(true); // Show error if CAPTCHA is incorrect
      
      // Set a timeout to clear the error message after 3 seconds
      setTimeout(() => {
        setCaptchaError(false);
      }, 3000);
    }
  };

  const handleSignup = () => {
    // After successful signup, switch to MainFeed view
    onViewSwitch('MainFeed');
  };

  // Function to generate random CAPTCHA string
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaString = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      captchaString += chars[randomIndex];
    }
    setCaptcha(captchaString); // Set the generated CAPTCHA
  };

  useEffect(() => {
    generateCaptcha(); // Generate a new CAPTCHA on component mount
  }, []);

  return (
    <div className={`container ${isSignup ? 'change' : ''}`}>
      <div className="forms-container">
        {/* Signup Form */}
        <div className={`form-control signup-form`}>
          <form action="#">
            <h2>SIGN UP</h2><br/>

            {/* Name input with icon */}
            <div className="input-wrapper">
              <i className="fas fa-user icon"></i>
              <input type="text" placeholder="Name" value={userSignupData.name} onChange={(e)=>{setUserSignupData({...userSignupData,name:e.target.value})}} required />
            </div>

            {/* Phone number input with icon */}
            <div className="input-wrapper">
              <i className="fas fa-phone-alt icon"></i>
              <input type="number" placeholder="Phone no." value={userSignupData.phNo} onChange={(e)=>{setUserSignupData({...userSignupData,phNo:e.target.value})}} required />
            </div>

            {/* Password input with icon */}
            <div className="input-wrapper">
              <i className="fas fa-key icon"></i>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                id="password"
                value={userSignupData.password} onChange={(e)=>{setUserSignupData({...userSignupData,password:e.target.value})}}
                required
              />
            </div>
            <i
                className={`fa ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'} toggle-password`}
                onClick={togglePasswordVisibility}
            ></i>

            <button type="button" onClick={handleSignup}>Sign Up</button>
          </form>
        </div>

        {/* Signin Form */}
        <div className="form-control signin-form">
          <form action="#">
            <h2>LOGIN</h2><br/>

            {/* Username input with icon */}
            <div className="input-wrapper">
              <i className="fas fa-user icon"></i>
              <input type="text" placeholder="Registered number" value={userLoginData.phNo} onChange={(e)=>{setUserLoginData({...userLoginData,phNo:e.target.value})}} required />
            </div>

            {/* Password input with icon */}
            <div className="input-wrapper">
              <i className="fas fa-key icon"></i>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                id="password"
                value={userLoginData.password}
                onChange={(e)=>{setUserLoginData({...userLoginData,password:e.target.value})}}
                required
              />
            </div>
            <i
                className={`fa ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'} toggle-password`}
                onClick={togglePasswordVisibility} id="eye"
            ></i>

            {/* CAPTCHA Input */}
            <div className="captcha-container">
              <div className="captcha-display">
                <span>{captcha}</span> {/* Display the CAPTCHA */}
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Enter CAPTCHA"
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)} // Update user input
                  required
                />
              </div>
            </div>
            {captchaError && <div className="captcha-error">Incorrect CAPTCHA, please try again.</div>}
            <button type="button" onClick={handleLogin}>LogIn</button>
          </form>
        </div>
      </div>

      {/* Intro Section */}
      <div className="intros-container">
        <div className="intro-control signin-intro">
          <div className="intro-control__inner">
          <h1>Welcome back to ShadowSend!</h1><br/>
          <p>A Secure Communication Platform! We’re excited to have you again. Your security is our priority -let's keep your messages safe!</p><br/>

            <button onClick={toggleForm}>No account yet? Sign Up.</button>
          </div>
        </div>

        <div className="intro-control signup-intro">
          <div className="intro-control__inner">
            <h1>Come join ShadowSend!</h1><br/>
            <p>
             A Secure Communication Platform! We’re excited to have you. Sign up now to send SMS securely</p><br/>
            <button onClick={toggleForm}>Already have an account? Sign In.</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
