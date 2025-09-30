import { useState, useEffect } from 'react';
import axios from 'axios';
import { LoginSignup } from './components/LoginSignup';
import { SwipeScreen } from './components/SwipeScreen';
import { ProfileDetailsScreen } from './components/ProfileDetailsScreen';
import { NFTDateScreen } from './components/NFTDateScreen';
import { RatingScreen } from './components/RatingScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { MyProfileScreen } from './components/MyProfileScreen';
import { SettingsScreen } from './components/SettingsScreen';

// Axios instance to automatically add the auth token
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [myProfile, setMyProfile] = useState(null); // State to hold logged-in user's profile
  const [token, setToken] = useState(localStorage.getItem('token'));


  const handleLogin = async (authToken) => {
    console.log("🔑 Token received by App.jsx:", authToken);
    localStorage.setItem('token', authToken);
    setToken(authToken);
    try {
        // Fetch the logged-in user's profile
        const response = await api.get('/profiles/me');
        setMyProfile(response.data);
        setCurrentScreen('swipe');
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // Handle error, maybe show a message to the user
    }
  };


  const handleProfileDetails = (profile) => {
    setSelectedProfile(profile);
    setCurrentScreen('profile');
  };

  const handleBuyNFTDate = (profile) => {
    setSelectedProfile(profile);
    setCurrentScreen('nftDate');
  };

  const handleCompleteDate = (profile) => {
    setSelectedProfile(profile);
    setCurrentScreen('rating');
  };

  const handleRatingComplete = (rating) => {
    // In a real app, you'd save the rating and update the user's stats
    console.log('Rating completed:', rating);
    setCurrentScreen('dashboard');
  };

  const handleBackToSwipe = () => {
    setSelectedProfile(null);
    setCurrentScreen('swipe');
  };

  const handleBackToProfile = () => {
    if (selectedProfile) {
      setCurrentScreen('profile');
    }
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const handleMyProfile = () => {
    setCurrentScreen('myProfile');
  };

  const handleSettings = () => {
    setCurrentScreen('settings');
  };

  const handleDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginSignup onLogin={handleLogin} />;

      case 'swipe':
        return (
          <SwipeScreen
            onProfileDetails={handleProfileDetails}
            onNFTDate={handleBuyNFTDate}
            onMyProfile={handleMyProfile}
            onDashboard={handleDashboard}
          />
        );

      case 'profile':
        return selectedProfile ? (
          <ProfileDetailsScreen
            profile={selectedProfile}
            onBack={handleBackToSwipe}
            onBuyNFTDate={handleBuyNFTDate}
          />
        ) : null;

      case 'nftDate':
        return selectedProfile ? (
          <NFTDateScreen
            profile={selectedProfile}
            onBack={handleBackToProfile}
            onComplete={handleCompleteDate}
          />
        ) : null;

      case 'rating':
        return selectedProfile ? (
          <RatingScreen
            profile={selectedProfile}
            onComplete={handleRatingComplete}
          />
        ) : null;

      case 'dashboard':
        return <DashboardScreen onBack={handleBackToSwipe} />;

      case 'myProfile':
        return (
          <MyProfileScreen
            profile={myProfile} // Pass the fetched profile data
            onBack={handleBackToSwipe}
            onSettings={handleSettings}
          />
        );

      case 'settings':
        return <SettingsScreen onBack={handleMyProfile} />;

      default:
        return <LoginSignup onLogin={handleLogin} />;
    }
  };

  return (
    <div className="size-full dark">
      {renderScreen()}
    </div>
  );
}