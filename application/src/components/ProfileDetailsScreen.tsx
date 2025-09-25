import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Heart, Diamond, Star, Calendar, Gamepad2, Gift } from 'lucide-react';
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

interface ProfileDetailsScreenProps {
  profile: Profile;
  onBack: () => void;
  onBuyNFTDate: (profile: Profile) => void;
}

export function ProfileDetailsScreen({ profile, onBack, onBuyNFTDate }: ProfileDetailsScreenProps) {
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
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="hover:bg-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold">{profile.name}'s Profile</h1>
        <div className="w-9" /> {/* Spacer */}
      </motion.div>

      {/* Image carousel */}
      <motion.div 
        className="relative aspect-[4/5] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ImageWithFallback
          src={images[currentImageIndex]}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* NFT Badge */}
        {profile.hasNFTDate && (
          <motion.div
            className="absolute top-4 right-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Badge className="bg-accent/20 text-accent border-accent/30 glow-blue">
              💎 {profile.nftBadge}
            </Badge>
          </motion.div>
        )}
        
        {/* Image dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
        
        {/* Profile info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {profile.name}, {profile.age}
              </h2>
              <p className="text-white/80 text-lg">{profile.tagline}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                size="lg"
                className="w-12 h-12 rounded-full bg-primary hover:bg-primary/80 glow-pink"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats bar */}
      <motion.div 
        className="flex justify-around py-4 glass-card mx-4 my-4 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="font-bold text-lg">{stats.successfulDates}</span>
          </div>
          <p className="text-xs text-muted-foreground">Dates</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="font-bold text-lg">{stats.rating}</span>
          </div>
          <p className="text-xs text-muted-foreground">Rating</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Diamond className="w-4 h-4 text-accent" />
            <span className="font-bold text-lg">{stats.earnedRewards}</span>
          </div>
          <p className="text-xs text-muted-foreground">NFTs</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        className="px-4 pb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="interests">Interests</TabsTrigger>
            <TabsTrigger value="nft">NFT Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="mt-4 space-y-4">
            <div className="glass-card p-4 rounded-2xl">
              <h3 className="font-semibold mb-2">About {profile.name}</h3>
              <p className="text-muted-foreground">
                Passionate about meaningful connections and exploring the intersection of technology and human relationships. 
                I believe in authentic conversations and genuine chemistry.
              </p>
            </div>
            
            <div className="glass-card p-4 rounded-2xl">
              <h3 className="font-semibold mb-2">Looking for</h3>
              <p className="text-muted-foreground">
                Someone who values authenticity, enjoys deep conversations, and is open to new experiences. 
                Bonus points if you're into crypto or art!
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="interests" className="mt-4">
            <div className="glass-card p-4 rounded-2xl">
              <h3 className="font-semibold mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="nft" className="mt-4 space-y-3">
            {nftActivity.map((activity, index) => (
              <div key={index} className="glass-card p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Diamond className={`w-4 h-4 ${
                      activity.type === 'earned' ? 'text-green-400' : 'text-accent'
                    }`} />
                    <span className="font-semibold">
                      {activity.type === 'earned' ? 'Earned' : 'Bought'} {activity.amount} NFT
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Buy NFT Date button */}
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