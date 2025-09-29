import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Star, Diamond, Heart, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Profile {
  id: string;
  name: string;
  age: number;
  image: string;
  tagline: string;
  hasNFTDate: boolean;
  nftBadge?: string;
}

interface RatingScreenProps {
  profile: Profile;
  onComplete: (rating: number) => void;
}

export function RatingScreen({ profile, onComplete }: RatingScreenProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [nftEarned, setNftEarned] = useState(false);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    
    // Simulate NFT outcome based on rating
    setTimeout(() => {
      const earned = rating >= 4;
      setNftEarned(earned);
      
      setTimeout(() => {
        onComplete(rating);
      }, 2000);
    }, 1000);
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return { text: "Not great", emoji: "😕", color: "text-red-400" };
      case 2: return { text: "Could be better", emoji: "😐", color: "text-orange-400" };
      case 3: return { text: "It was okay", emoji: "🙂", color: "text-yellow-400" };
      case 4: return { text: "Really enjoyed it!", emoji: "😊", color: "text-green-400" };
      case 5: return { text: "Amazing connection!", emoji: "😍", color: "text-pink-400" };
      default: return { text: "How was your date?", emoji: "💫", color: "text-muted-foreground" };
    }
  };

  const ratingInfo = getRatingText(rating || hoveredRating);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-32 h-32 mx-auto rounded-full glass-card flex items-center justify-center relative overflow-hidden"
            animate={{ 
              boxShadow: nftEarned 
                ? "0 0 40px rgba(0, 229, 255, 0.4)" 
                : "0 0 40px rgba(255, 45, 85, 0.4)"
            }}
          >
            <ImageWithFallback
              src={profile.image}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            
            {nftEarned ? (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-accent/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <CheckCircle className="w-12 h-12 text-accent" />
              </motion.div>
            ) : (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-primary/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Heart className="w-12 h-12 text-primary" />
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {nftEarned ? (
              <>
                <h2 className="text-2xl font-bold gradient-text-pink-blue mb-2">
                  NFT Earned! 🎉
                </h2>
                <p className="text-muted-foreground">
                  Both of you rated 4+ stars! Your 3 NFTs have been returned plus 2 bonus NFTs.
                </p>
                <div className="flex items-center justify-center space-x-2 mt-4 glass-card px-4 py-2 rounded-full w-fit mx-auto glow-blue">
                  <Diamond className="w-5 h-5 text-accent" />
                  <span className="font-bold">+5 NFTs</span>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold gradient-text-purple-pink mb-2">
                  Thanks for the feedback!
                </h2>
                <p className="text-muted-foreground">
                  Your 3 NFTs have been transferred to {profile.name} as the rating was below 4 stars.
                </p>
                <div className="flex items-center justify-center space-x-2 mt-4 glass-card px-4 py-2 rounded-full w-fit mx-auto glow-pink">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="font-bold">Better luck next time!</span>
                </div>
              </>
            )}
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="glass-card p-4 rounded-2xl">
              <h3 className="font-semibold mb-2">Your Rating: {rating} stars</h3>
              <p className="text-sm text-muted-foreground">
                {profile.name} also rated the experience. Both ratings determine the NFT outcome.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <motion.div 
        className="text-center space-y-8 max-w-sm w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Profile */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="w-32 h-32 mx-auto rounded-full glass-card overflow-hidden glow-pink">
            <ImageWithFallback
              src={profile.image}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass-card px-3 py-1 rounded-full border border-accent/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-sm font-semibold">{profile.name}</span>
          </motion.div>
        </motion.div>

        {/* Rating instruction */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h1 className="text-2xl font-bold gradient-text-pink-blue">
            Rate Your Date
          </h1>
          <p className="text-muted-foreground">
            Your honest feedback helps build trust in our community
          </p>
        </motion.div>

        {/* Star rating */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <motion.button
                key={value}
                onClick={() => handleRatingClick(value)}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-2 transition-transform hover:scale-110"
                whileTap={{ scale: 0.95 }}
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    value <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                />
              </motion.button>
            ))}
          </div>
          
          <motion.div
            className="h-16 flex items-center justify-center"
            key={ratingInfo.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">{ratingInfo.emoji}</div>
              <p className={`font-medium ${ratingInfo.color}`}>
                {ratingInfo.text}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* NFT info */}
        <motion.div
          className="glass-card p-4 rounded-2xl space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <Diamond className="w-5 h-5 text-accent" />
            <span className="font-semibold">NFT Validation</span>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p>⭐ Both rate 4-5 stars: <span className="text-green-400 font-medium">Both earn NFTs + bonus</span></p>
            <p>⭐ One rates below 4: <span className="text-orange-400 font-medium">NFTs go to higher rater</span></p>
            <p>⭐ Both rate below 4: <span className="text-red-400 font-medium">No NFTs earned</span></p>
          </div>
        </motion.div>

        {/* Submit button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 glow-pink disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
            size="lg"
          >
            {rating === 0 ? 'Select a rating first' : 'Validate NFT Experience'}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}