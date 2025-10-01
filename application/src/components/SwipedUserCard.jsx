import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Function to format the time since the swipe
const timeSince = (date) => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

// Helper to construct the correct image URL
const getImageUrl = (imagePath, name) => {
    if (!imagePath) {
        return `https://via.placeholder.com/400x500.png?text=${name}`;
    }
    // Check if it's a full URL (e.g., Cloudinary) or a local path
    return imagePath.startsWith("http") 
        ? imagePath 
        : `${API_BASE_URL ? API_BASE_URL : 'http://localhost:5000'}/${imagePath.replace(/\\/g, "/")}`;
};


export function SwipedUserCard({ profile, onSelectProfile }) {
  const profileImage = profile.profile.images?.[0] || null;
  const imageUrl = getImageUrl(profileImage, profile.profile.name);
  const swipeTime = timeSince(profile.createdAt);
  const displayName = `${profile.profile.name}, ${profile.profile.age}`;

  // Since we only track 'like' swipes here, we know the action was a right swipe (Heart)
  const icon = <Heart className="w-4 h-4 text-primary fill-primary" />;

  return (
    <motion.div
      onClick={() => onSelectProfile(profile.profile)}
      className="flex items-center space-x-4 p-3 glass-card rounded-xl border border-white/10 hover:border-primary/50 cursor-pointer transition-all duration-300"
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {/* DP / Avatar */}
      <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={profile.profile.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white truncate">{displayName}</p>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          {icon}
          <span className="text-xs">{swipeTime}</span>
        </div>
      </div>

      {/* Action / Chevron */}
      <ChevronRight className="w-5 h-5 text-primary/70 shrink-0" />
    </motion.div>
  );
}
