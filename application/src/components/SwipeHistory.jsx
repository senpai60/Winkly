import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import axios from 'axios';
import { ArrowLeft, History, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { SwipedUserCard } from './SwipedUserCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Re-use the platform-aware axios instance setup
const api = axios.create({
  baseURL: API_BASE_URL 
    ? `${API_BASE_URL}/api` 
    : (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
        ? `http://localhost:5000/api`
        : `/api`, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export function SwipeHistory({ onBack, onSelectProfile }) {
  const [swipes, setSwipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // NOTE: This assumes a new backend endpoint exists (e.g., /swipes/history)
    // that returns an array of swipe objects including the 'swiped' user's profile data.
    const fetchSwipeHistory = async () => {
      try {
        setIsLoading(true);
        // Assuming we need a custom endpoint to get liked profiles.
        // For now, we'll mock the data since the backend doesn't seem to expose this endpoint yet.
        const mockData = [
            {
                _id: 'swipe1',
                createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
                action: 'like',
                profile: {
                    _id: 'user2',
                    name: 'Alex',
                    age: 28,
                    tagline: 'Artist & NFT collector',
                    images: ['https://images.unsplash.com/photo-1656587324100-6bb6a6223a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGhhbmRzb21lJTIwZGF0aW5nJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTg3OTA4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
                }
            },
            {
                _id: 'swipe2',
                createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
                action: 'like',
                profile: {
                    _id: 'user4',
                    name: 'James',
                    age: 30,
                    tagline: 'Tech entrepreneur & DeFi explorer',
                    images: ['https://images.unsplash.com/photo-1750390200266-c54ea0da12c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMGNhc3VhbCUyMG1vZGVybiUyMHN0eWxlfGVufDF8fHx8MTc1ODc5MDg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
                }
            },
            {
                _id: 'swipe3',
                createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
                action: 'like',
                profile: {
                    _id: 'user5',
                    name: 'Chloe',
                    age: 27,
                    tagline: 'Blockchain investor & dog lover',
                    images: ['https://images.unsplash.com/photo-1542385966-23910f545934?w=400'],
                }
            }
        ];
        
        // In a real scenario, replace mockData with:
        // const response = await api.get('/swipes/history?action=like');
        // setSwipes(response.data);
        setSwipes(mockData);

      } catch (err) {
        console.error("Failed to fetch swipe history:", err);
        setError("Failed to load history.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSwipeHistory();
  }, []);

  const likedProfiles = swipes.filter(s => s.action === 'like');

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
        <h1 className="font-semibold gradient-text-pink-blue flex items-center space-x-2">
            <History className="w-5 h-5" />
            <span>Like History</span>
        </h1>
        <div className="w-9" /> {/* Spacer */}
      </motion.div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {isLoading && (
          <p className="text-center text-muted-foreground pt-10">Loading swipe history...</p>
        )}
        
        {error && (
            <p className="text-center text-red-500 pt-10">{error}</p>
        )}

        {!isLoading && !error && (
            likedProfiles.length > 0 ? (
                likedProfiles.map((swipe, index) => (
                    <SwipedUserCard 
                        key={swipe._id}
                        profile={swipe}
                        onSelectProfile={onSelectProfile}
                    />
                ))
            ) : (
                <div className="text-center pt-20 space-y-4">
                    <Heart className="w-10 h-10 text-muted-foreground mx-auto" />
                    <h2 className="text-xl font-bold text-white">No Likes Yet</h2>
                    <p className="text-muted-foreground">Go back to discover new people!</p>
                </div>
            )
        )}
      </div>
    </div>
  );
}
