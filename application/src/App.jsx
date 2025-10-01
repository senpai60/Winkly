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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''; 

// const api = axios.create({
//   // FIX 2: If API_BASE_URL is '', the resulting base URL is just '/api'.
//   // This relative path triggers the Netlify/Vite proxy.
//   baseURL: `${API_BASE_URL}/api`, 
// });


const api = axios.create({
  // FIX: If VITE_API_BASE_URL is empty (local dev), explicitly use http://localhost:5000/api
  baseURL: API_BASE_URL ? `${API_BASE_URL}/api` : `http://localhost:5000/api`, 
});

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
  const [currentScreen, setCurrentScreen] = useState('loading'); 
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [myProfile, setMyProfile] = useState(null);

  // Checks for an existing session when the app loads
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setCurrentScreen('login');
        return;
      }

      try {
        const response = await api.get('/profiles/me');
        setMyProfile(response.data);
        setCurrentScreen('swipe');
      } catch (error) {
        console.error("Session invalid or expired:", error);
        localStorage.removeItem('token');
        setCurrentScreen('login');
      }
    };

    verifyUser();
  }, []);

  // Handles login and fetches the user's profile
  const handleLogin = async (authToken) => {
    localStorage.setItem('token', authToken);
    try {
      const response = await api.get('/profiles/me');
      setMyProfile(response.data);
      setCurrentScreen('swipe');
    } catch (error) {
      console.error("Failed to fetch user profile after login:", error);
      setCurrentScreen('login');
    }
  };

  // --- LOGOUT FUNCTIONALITY ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    setMyProfile(null);
    setCurrentScreen('login');
    // Optional: could also make a call to a /api/logout endpoint
  };

  // --- Navigation Handlers ---
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

  const handleMyProfile = () => {
    setCurrentScreen('myProfile');
  };

  const handleSettings = () => {
    setCurrentScreen('settings');
  };

  const handleDashboard = () => {
    setCurrentScreen('dashboard');
  };

  // Renders the correct screen based on the current state
  const renderScreen = () => {
    if (currentScreen === 'loading') {
      return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-white">Loading...</p></div>;
    }

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
            profile={myProfile}
            onBack={handleBackToSwipe}
            onSettings={handleSettings}
          />
        );
      case 'settings':
        return <SettingsScreen onBack={handleMyProfile} onLogout={handleLogout} />;
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