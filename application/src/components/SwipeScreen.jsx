import { useState, useEffect } from "react";
import { motion } from "motion/react";
import axios from "axios";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, Heart, Diamond, Zap, User, Wallet } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Axios instance to automatically add the auth token
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  // FIX: Explicitly setting local fallback to use HTTP protocol
  // If VITE_API_BASE_URL is available (Vercel/Prod), use it. Otherwise, force HTTP://localhost:5000
  baseURL: API_BASE_URL ? `${API_BASE_URL}/api` : `http://localhost:5000/api`, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function SwipeScreen({
  onProfileDetails,
  onNFTDate,
  onMyProfile,
  onDashboard,
}) {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nftBalance] = useState(12);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get("/profiles");
        setProfiles(response.data);
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
        // Handle token expiration/invalid session if needed
        setError("Could not load profiles. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleSwipe = (direction) => {
    console.log(`Swiped ${direction} on ${profiles[currentIndex]?.name}`);
    if (currentIndex < profiles.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      handleSwipe("right");
    } else if (info.offset.x < -threshold) {
      handleSwipe("left");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-white">Finding people for you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Determine if we are out of profiles
  const isOutOfProfiles = currentIndex >= profiles.length;
  const currentProfile = profiles[currentIndex];

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      
      {/* 1. Header with navigation (ALWAYS RENDERED) */}
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          onClick={onMyProfile}
          variant="ghost"
          size="sm"
          className="hover:bg-white/10 p-2"
        >
          <User className="w-6 h-6" /> {/* User Profile Icon */}
        </Button>
        <h1 className="gradient-text-pink-blue font-bold text-2xl">Discover</h1>
        <Button
          onClick={onDashboard}
          variant="ghost"
          size="sm"
          className="hover:bg-white/10 p-1"
        >
          <div className="glass-card px-3 py-2 rounded-full glow-blue">
            <div className="flex items-center space-x-2">
              <Diamond className="w-4 h-4 text-accent" />
              <span className="font-semibold">{nftBalance}</span>
            </div>
          </div>
        </Button>
      </motion.div>

      {/* 2. Card stack / Fallback content (CONDITIONAL RENDERING) */}
      <div className="flex-1 relative flex items-center justify-center">
        {isOutOfProfiles ? (
          // Fallback Screen Content (Header is preserved)
          <div className="flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-2xl font-bold text-white mb-2">
              That's everyone for now!
            </h2>
            <p className="text-muted-foreground mb-6">
              Check back later for new profiles.
            </p>
            <Button onClick={() => setCurrentIndex(0)}>Start Over</Button>
          </div>
        ) : (
          <>
            {/* Background cards */}
            {profiles
              .slice(currentIndex + 1, currentIndex + 3)
              .map((profile, index) => (
                <motion.div
                  key={profile._id} 
                  className="absolute w-full max-w-sm aspect-[3/4] glass-card rounded-3xl"
                  style={{
                    zIndex: -index,
                    scale: 1 - (index + 1) * 0.05,
                    y: (index + 1) * 10,
                  }}
                  initial={{ scale: 1 - (index + 1) * 0.05 }}
                />
              ))}

            {/* Main swipe card */}
            <motion.div
              key={currentProfile._id} 
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.05, rotate: 5 }}
              className="w-full max-w-sm aspect-[3/4] glass-card rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing"
              style={{ zIndex: 10 }}
              onClick={() => onProfileDetails(currentProfile)}
            >
              <div className="relative h-full">
                <ImageWithFallback
                  src={
                    currentProfile.images && currentProfile.images.length > 0
                      ? currentProfile.images[0].startsWith("http") // Cloudinary URL check
                        ? currentProfile.images[0] 
                        : `http://localhost:5000/${currentProfile.images[0].replace(
                            /\\/g,
                            "/"
                          )}` // Local path fallback
                      : `https://via.placeholder.com/400x500.png?text=${currentProfile.name}`
                  }
                  alt={currentProfile.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-1">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  <p className="text-white/80 mb-4">{currentProfile.tagline}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* 3. Action buttons (ONLY RENDERED IF PROFILES ARE AVAILABLE) */}
      {!isOutOfProfiles && (
        <motion.div
          className="flex justify-center items-center space-x-6 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => handleSwipe("left")}
            size="lg"
            variant="outline"
            className="w-14 h-14 rounded-full border-red-500/30 hover:border-red-500 hover:bg-red-500/10 hover:glow-pink"
          >
            <X className="w-6 h-6 text-red-500" />
          </Button>
          <Button
            onClick={() => handleSwipe("right")}
            size="lg"
            className="w-14 h-14 rounded-full bg-primary hover:bg-primary/80 glow-pink"
          >
            <Heart className="w-6 h-6" />
          </Button>
          <Button
            onClick={() => onNFTDate(currentProfile)}
            size="lg"
            variant="outline"
            className="w-14 h-14 rounded-full border-accent/30 hover:border-accent hover:bg-accent/10 hover:glow-blue"
          >
            <Diamond className="w-6 h-6 text-accent" />
          </Button>
        </motion.div>
      )}

      {/* 4. Swipe hint (ONLY RENDERED IF PROFILES ARE AVAILABLE) */}
      {!isOutOfProfiles && (
        <motion.p 
          className="text-center text-muted-foreground text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Swipe or tap card for details • 💎 Buy NFT Date
        </motion.p>
      )}
    </div>
  );
}
// UserIconUpdae