import { useState } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { SwipeScreen } from './components/SwipeScreen';
import { ProfileDetailsScreen } from './components/ProfileDetailsScreen';
import { NFTDateScreen } from './components/NFTDateScreen';
import { RatingScreen } from './components/RatingScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { MyProfileScreen } from './components/MyProfileScreen';
import { SettingsScreen } from './components/SettingsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('auth');
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleLogin = () => {
    setCurrentScreen('swipe');
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
      case 'auth':
        return <AuthScreen onLogin={handleLogin} />;
      
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
            onBack={handleBackToSwipe}
            onSettings={handleSettings}
          />
        );
      
      case 'settings':
        return <SettingsScreen onBack={handleMyProfile} />;
      
      default:
        return <AuthScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="size-full dark">
      {renderScreen()}
    </div>
  );
}