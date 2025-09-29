import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, Heart, Diamond, Zap, User, Wallet } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const mockProfiles = [
  {
    id: '1',
    name: 'Sarah',
    age: 25,
    image: 'https://images.unsplash.com/photo-1634552516330-ab1ccc0f605e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwc21pbGluZyUyMGRhdGluZyUyMHByb2ZpbGV8ZW58MXx8fHwxNzU4NzkwODU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tagline: 'Coffee enthusiast & crypto trader',
    hasNFTDate: true,
    nftBadge: 'Active NFT Date'
  },
  {
    id: '2',
    name: 'Alex',
    age: 28,
    image: 'https://images.unsplash.com/photo-1656587324100-6bb6a6223a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGhhbmRzb21lJTIwZGF0aW5nJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTg3OTA4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tagline: 'Artist & NFT collector',
    hasNFTDate: false
  },
  {
    id: '3',
    name: 'Maya',
    age: 24,
    image: 'https://images.unsplash.com/photo-1625477238092-3b6f136cf551?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwYmVhdXRpZnVsJTIwbW9kZXJuJTIwc3R5bGV8ZW58MXx8fHwxNzU4NzkwODY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tagline: 'Yoga instructor & blockchain enthusiast',
    hasNFTDate: false
  },
  {
    id: '4',
    name: 'James',
    age: 30,
    image: 'https://images.unsplash.com/photo-1750390200266-c54ea0da12c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGNhc3VhbCUyMG1vZGVybiUyMHN0eWxlfGVufDF8fHx8MTc1ODc5MDg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tagline: 'Tech entrepreneur & DeFi explorer',
    hasNFTDate: false
  }
];

export function SwipeScreen({ onProfileDetails, onNFTDate, onMyProfile, onDashboard }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nftBalance] = useState(12);

  const currentProfile = mockProfiles[currentIndex];

  const handleSwipe = (direction) => {
    if (currentIndex < mockProfiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to start
    }
  };

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      handleSwipe('right');
    } else if (info.offset.x < -threshold) {
      handleSwipe('left');
    }
  };

  if (!currentProfile) return null;

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      {/* Header with navigation */}
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
          <User className="w-6 h-6" />
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

      {/* Card stack */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Background cards */}
        {mockProfiles.slice(currentIndex + 1, currentIndex + 3).map((profile, index) => (
          <motion.div
            key={profile.id}
            className="absolute w-full max-w-sm aspect-[3/4] glass-card rounded-3xl"
            style={{
              zIndex: -index,
              scale: 1 - (index + 1) * 0.05,
              y: (index + 1) * 10,
            }}
            initial={{ scale: 1 - (index + 1) * 0.05 }}
          />
        ))}

        {/* Main card */}
        <motion.div
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
              src={currentProfile.image}
              alt={currentProfile.name}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* NFT Badge */}
            {currentProfile.hasNFTDate && (
              <motion.div
                className="absolute top-4 right-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Badge className="bg-accent/20 text-accent border-accent/30 glow-blue">
                  <Zap className="w-3 h-3 mr-1" />
                  {currentProfile.nftBadge}
                </Badge>
              </motion.div>
            )}
            
            {/* Profile info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl font-bold mb-1">
                {currentProfile.name}, {currentProfile.age}
              </h2>
              <p className="text-white/80 mb-4">{currentProfile.tagline}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action buttons */}
      <motion.div 
        className="flex justify-center items-center space-x-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={() => handleSwipe('left')}
          size="lg"
          variant="outline"
          className="w-14 h-14 rounded-full border-red-500/30 hover:border-red-500 hover:bg-red-500/10 hover:glow-pink"
        >
          <X className="w-6 h-6 text-red-500" />
        </Button>
        
        <Button
          onClick={() => handleSwipe('right')}
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

      {/* Swipe hint */}
      <motion.p 
        className="text-center text-muted-foreground text-sm mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Swipe or tap card for details • 💎 Buy NFT Date
      </motion.p>
    </div>
  );
}