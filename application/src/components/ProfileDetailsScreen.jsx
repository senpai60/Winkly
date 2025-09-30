import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Heart, Diamond, Star, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProfileDetailsScreen({ profile, onBack, onBuyNFTDate }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Use the images from the profile prop. If none, provide a placeholder.
  const images = profile.images && profile.images.length > 0
    ? profile.images.map(p => `${import.meta.env.VITE_API_BASE_URL}/${p.replace(/\\/g, '/')}`)
    : [`https://via.placeholder.com/400x500.png?text=${profile.name}`];

  // Use the nftStats from the profile prop.
  const stats = profile.nftStats || {
    nftDates: 0,
    rating: 0,
    totalEarned: 0
  };

  // Use interests from the profile prop.
  const interests = profile.interests || [];

  // This can be fetched from a separate API endpoint in the future
  const nftActivity = [
    { type: 'earned', amount: 5, date: '2 days ago', description: 'Completed 7-day date with Mike' },
    { type: 'bought', amount: 3, date: '1 week ago', description: 'NFT Date purchase for Emma' },
  ];
  
  if (!profile) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <p className="text-white">Loading profile details...</p>
        </div>
      );
  }

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
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
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
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {profile.name}, {profile.age}
              </h2>
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
            <span className="font-bold text-lg">{stats.nftDates}</span>
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
            <span className="font-bold text-lg">{stats.totalEarned}</span>
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
              <p className="text-muted-foreground">{profile.about || 'Nothing to see here yet!'}</p>
            </div>
            
            <div className="glass-card p-4 rounded-2xl">
              <h3 className="font-semibold mb-2">Looking for</h3>
              <p className="text-muted-foreground">{profile.lookingFor || 'Someone amazing!'}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="interests" className="mt-4">
            <div className="glass-card p-4 rounded-2xl">
              <h3 className="font-semibold mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interests.length > 0 ? interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/5 hover:bg-white/10 transition-colors">
                    {interest}
                  </Badge>
                )) : <p className="text-sm text-muted-foreground">No interests listed yet.</p>}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="nft" className="mt-4 space-y-3">
            {nftActivity.map((activity, index) => (
              <div key={index} className="glass-card p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Diamond className={`w-4 h-4 ${activity.type === 'earned' ? 'text-green-400' : 'text-accent'}`} />
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
      </motion.div>
    </div>
  );
}