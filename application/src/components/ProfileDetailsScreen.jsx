import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Heart, Diamond, Star, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProfileDetailsScreen({ profile, onBack, onBuyNFTDate }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    profile.image,
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
  ];

  const stats = {
    successfulDates: 15,
    rating: 4.8,
    earnedRewards: 47
  };

  const interests = ['Coffee', 'Crypto', 'Art', 'Travel', 'Music', 'Fitness'];
  const nftActivity = [
    { type: 'earned', amount: 5, date: '2 days ago', description: 'Completed 7-day date with Mike' },
    { type: 'bought', amount: 3, date: '1 week ago', description: 'NFT Date purchase for Emma' },
    { type: 'earned', amount: 8, date: '2 weeks ago', description: 'Completed 7-day date with Alex' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between p-4 glass-card sticky top-0 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button onClick={onBack} variant="ghost" size="sm" className="hover:bg-white/10">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold">{profile.name}'s Profile</h1>
        <div className="w-9" />
      </motion.div>

      {/* Image carousel */}
      <motion.div 
        className="relative aspect-[4/5] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ImageWithFallback src={images[currentImageIndex]} alt={profile.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {profile.hasNFTDate && (
          <motion.div className="absolute top-4 right-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
            <Badge className="bg-accent/20 text-accent border-accent/30 glow-blue">💎 {profile.nftBadge}</Badge>
          </motion.div>
        )}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{profile.name}, {profile.age}</h2>
              <p className="text-white/80 text-lg">{profile.tagline}</p>
            </div>
            <div className="flex space-x-2">
              <Button size="lg" className="w-12 h-12 rounded-full bg-primary hover:bg-primary/80 glow-pink">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Action button */}
      <motion.div 
        className="sticky bottom-0 p-4 glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button 
          onClick={() => onBuyNFTDate(profile)}
          className="w-full py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 glow-pink text-lg font-semibold"
          size="lg"
        >
          <Diamond className="w-5 h-5 mr-2" />
          Buy 7-Day NFT Date (3 NFTs)
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-2">
          Refundable if both parties rate 4+ stars
        </p>
      </motion.div>
    </div>
  );
}