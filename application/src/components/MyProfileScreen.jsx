import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Edit3, Camera, Star, Diamond, Calendar, Settings, Share2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function MyProfileScreen({ onBack, onSettings }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex',
    age: 26,
    tagline: 'Web3 developer & crypto enthusiast',
    about: 'I love building decentralized applications and exploring the future of digital relationships. Always up for deep conversations about technology, art, and life.',
    lookingFor: 'Someone genuine who shares my passion for innovation and isn\'t afraid to be vulnerable.',
    interests: ['Crypto', 'Art', 'Travel', 'Coffee', 'Gaming', 'Music']
  });

  const userStats = {
    profileViews: 2847,
    likes: 156,
    nftDates: 8,
    successRate: 87,
    rating: 4.9,
    totalEarned: 47
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const profileImages = [
    'https://images.unsplash.com/photo-1639986162505-c9bcccfc9712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMHByb2ZpbGUlMjBwaG90byUyMG1vZGVybnxlbnwxfHx8fDE3NTg3OTE1MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to backend
  };

  const handleInterestToggle = (interest) => {
    if (isEditing) {
      setProfileData(prev => ({
        ...prev,
        interests: prev.interests.includes(interest)
          ? prev.interests.filter(i => i !== interest)
          : [...prev.interests, interest]
      }));
    }
  };

  const availableInterests = ['Crypto', 'Art', 'Travel', 'Coffee', 'Gaming', 'Music', 'Fitness', 'Reading', 'Movies', 'Cooking'];

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
        <h1 className="font-semibold gradient-text-pink-blue">My Profile</h1>
        <div className="flex space-x-2">
          <Button onClick={onSettings} variant="ghost" size="sm" className="hover:bg-white/10">
            <Settings className="w-5 h-5" />
          </Button>
          <Button onClick={() => setIsEditing(!isEditing)} variant="ghost" size="sm" className="hover:bg-white/10">
            <Edit3 className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Profile Images */}
      <motion.div 
        className="relative aspect-[4/5] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ImageWithFallback src={profileImages[currentImageIndex]} alt="My Profile" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {isEditing && (
          <motion.div className="absolute top-4 right-4" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Button size="sm" className="bg-black/50 hover:bg-black/70 backdrop-blur-sm">
              <Camera className="w-4 h-4 mr-2" />
              Edit Photos
            </Button>
          </motion.div>
        )}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2">
          {profileImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end justify-between">
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="text-2xl font-bold bg-black/30 border-white/20 text-white"
                    placeholder="Your name"
                  />
                  <Input
                    value={profileData.tagline}
                    onChange={(e) => setProfileData(prev => ({ ...prev, tagline: e.target.value }))}
                    className="bg-black/30 border-white/20 text-white"
                    placeholder="Your tagline"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-2">{profileData.name}, {profileData.age}</h2>
                  <p className="text-white/80 text-lg">{profileData.tagline}</p>
                </>
              )}
            </div>
            <Button size="sm" variant="outline" className="border-white/30 hover:bg-white/10">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}