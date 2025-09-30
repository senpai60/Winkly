import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Edit3, Camera, Star, Diamond, Calendar, Settings, Share2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileData {
  name: string;
  age: number | string;
  tagline: string;
  about: string;
  lookingFor: string;
  interests: string[];
}

interface MyProfileScreenProps {
  profile: any; 
  onBack: () => void;
  onSettings: () => void;
}

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export function MyProfileScreen({ profile, onBack, onSettings }: MyProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '', age: '', tagline: '', about: '', lookingFor: '', interests: []
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setProfileData({
        name: profile.name || '',
        age: profile.age || '',
        tagline: profile.tagline || '',
        about: profile.about || '',
        lookingFor: profile.lookingFor || '',
        interests: profile.interests || []
      });
      setSelectedFiles([]);
    }
  }, [profile]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', profileData.name);
    formData.append('age', String(profileData.age));
    formData.append('tagline', profileData.tagline);
    formData.append('about', profileData.about);
    formData.append('lookingFor', profileData.lookingFor);
    profileData.interests.forEach(interest => formData.append('interests[]', interest)); // Use [] for arrays

    selectedFiles.forEach(file => {
      formData.append('images', file);
    });
    
    try {
      const response = await api.post('/profiles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      console.log('Profile updated successfully:', response.data);
      alert('Profile saved!');
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Could not save profile. Please try again.");
    }
  };

  const handleInterestToggle = (interest: string) => {
    if (isEditing) {
      setProfileData(prev => ({
        ...prev,
        interests: prev.interests.includes(interest)
          ? prev.interests.filter(i => i !== interest)
          : [...prev.interests, interest]
      }));
    }
  };

  const handleEditPhotosClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const userStats = profile?.nftStats || {
    profileViews: 0, likes: 0, nftDates: 0, successRate: 0, rating: 0, totalEarned: 0
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const profileImages = selectedFiles.length > 0 
    ? selectedFiles.map(file => URL.createObjectURL(file))
    : (profile?.images?.length > 0 ? profile.images.map((p: string) => `http://localhost:5000/${p.replace(/\\/g, '/')}`) : [
    'https://via.placeholder.com/400x500.png?text=No+Image', // A neutral placeholder
  ]);
  
  const availableInterests = ['Crypto', 'Art', 'Travel', 'Coffee', 'Gaming', 'Music', 'Fitness', 'Reading', 'Movies', 'Cooking'];

  if (!profile) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <p>Loading profile...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
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

      <motion.div 
        className="relative aspect-[4/5] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ImageWithFallback
          src={profileImages[currentImageIndex]}
          alt="My Profile"
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {isEditing && (
          <motion.div className="absolute top-4 right-4" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*"
              className="hidden"
            />
            <Button
              size="sm"
              className="bg-black/50 hover:bg-black/70 backdrop-blur-sm"
              onClick={handleEditPhotosClick}
            >
              <Camera className="w-4 h-4 mr-2" />
              Edit Photos
            </Button>
          </motion.div>
        )}
        
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2">
          {profileImages.map((img, index) => (
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
                    value={profileData.age}
                    type="number"
                    onChange={(e) => setProfileData(prev => ({ ...prev, age: parseInt(e.target.value) || '' }))}
                    className="text-lg bg-black/30 border-white/20 text-white"
                    placeholder="Your age"
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
                  <h2 className="text-3xl font-bold mb-2">
                    {profileData.name}{profileData.age ? `, ${profileData.age}` : ''}
                  </h2>
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
      
      {/* Rest of the component JSX... */}
       <motion.div 
        className="grid grid-cols-3 gap-4 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-card text-center">
          <CardContent className="p-3">
            <div className="text-xl font-bold gradient-text-pink-blue">{userStats.profileViews}</div>
            <p className="text-xs text-muted-foreground">Profile Views</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card text-center">
          <CardContent className="p-3">
            <div className="text-xl font-bold gradient-text-purple-pink">{userStats.likes}</div>
            <p className="text-xs text-muted-foreground">Likes Received</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card text-center">
          <CardContent className="p-3">
            <div className="flex items-center justify-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-xl font-bold text-yellow-400">{userStats.rating}</span>
            </div>
            <p className="text-xs text-muted-foreground">Rating</p>
          </CardContent>
        </Card>
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
            <TabsTrigger value="stats">NFT Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="mt-4 space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  About Me
                  {isEditing && <Edit3 className="w-4 h-4 text-muted-foreground" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profileData.about}
                    onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                    className="glass border-white/10"
                    rows={4}
                    placeholder="Tell people about yourself..."
                  />
                ) : (
                  <p className="text-muted-foreground">{profileData.about}</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Looking For</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profileData.lookingFor}
                    onChange={(e) => setProfileData(prev => ({ ...prev, lookingFor: e.target.value }))}
                    className="glass border-white/10"
                    rows={3}
                    placeholder="What are you looking for?"
                  />
                ) : (
                  <p className="text-muted-foreground">{profileData.lookingFor}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="interests" className="mt-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>My Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {isEditing ? (
                    <>
                      {availableInterests.map((interest) => (
                        <Badge 
                          key={interest}
                          variant={profileData.interests.includes(interest) ? "default" : "outline"}
                          className={`cursor-pointer transition-all ${
                            profileData.interests.includes(interest)
                              ? 'bg-primary hover:bg-primary/80'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                          onClick={() => handleInterestToggle(interest)}
                        >
                          {interest}
                        </Badge>
                      ))}
                    </>
                  ) : (
                    profileData.interests.map((interest, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-white/5"
                      >
                        {interest}
                      </Badge>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats" className="mt-4 space-y-4">
            {/* Stats content remains the same */}
          </TabsContent>
        </Tabs>
      </motion.div>
      {isEditing && (
        <motion.div 
          className="sticky bottom-0 p-4 glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex space-x-3">
            <Button 
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="flex-1 glass border-white/20 hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="flex-1 bg-primary hover:bg-primary/80 glow-pink"
            >
              Save Changes
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}