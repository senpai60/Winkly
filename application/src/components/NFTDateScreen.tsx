import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { ArrowLeft, Send, Video, Gamepad2, Gift, Timer } from 'lucide-react';
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

interface NFTDateScreenProps {
  profile: Profile;
  onBack: () => void;
  onComplete: (profile: Profile) => void;
}

export function NFTDateScreen({ profile, onBack, onComplete }: NFTDateScreenProps) {
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(3 * 24 * 60 * 60); // 3 days in seconds
  const [currentDay, setCurrentDay] = useState(3);
  const [messages] = useState([
    { id: '1', text: "Hey! Excited to start our NFT date week 😊", sender: 'them', time: '2 hours ago' },
    { id: '2', text: "Me too! This is such a cool concept", sender: 'me', time: '2 hours ago' },
    { id: '3', text: "Want to do a video call later?", sender: 'them', time: '1 hour ago' },
    { id: '4', text: "Absolutely! How about 8pm?", sender: 'me', time: '45 min ago' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const mins = Math.floor((seconds % (60 * 60)) / 60);
    return `${days}d ${hours}h ${mins}m`;
  };

  const progressPercentage = ((7 - (timeLeft / (24 * 60 * 60))) / 7) * 100;

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      setMessage('');
    }
  };

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
        
        <div className="flex items-center space-x-3">
          <ImageWithFallback
            src={profile.image}
            alt={profile.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h1 className="font-semibold">{profile.name}</h1>
            <div className="flex items-center space-x-1">
              <Timer className="w-3 h-3 text-accent" />
              <span className="text-xs text-accent">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
        
        <div className="w-9" /> {/* Spacer */}
      </motion.div>

      {/* Progress tracker */}
      <motion.div 
        className="p-4 glass-card mx-4 my-2 rounded-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Day {currentDay} of 7</span>
          <span className="text-xs text-muted-foreground">
            {Math.round(progressPercentage)}% complete
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          Rate each other 4+ stars to earn NFT rewards!
        </p>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className={`max-w-xs p-3 rounded-2xl ${
              msg.sender === 'me' 
                ? 'bg-primary text-white rounded-br-sm' 
                : 'glass-card rounded-bl-sm'
            }`}>
              <p className="text-sm">{msg.text}</p>
              <span className={`text-xs mt-1 block ${
                msg.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'
              }`}>
                {msg.time}
              </span>
            </div>
          </motion.div>
        ))}
        
        {/* Activity suggestions */}
        <motion.div 
          className="glass-card p-4 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="font-semibold mb-3 gradient-text-pink-blue">Date Activities</h3>
          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-col h-auto py-3 glass border-accent/20 hover:border-accent hover:glow-blue"
            >
              <Video className="w-5 h-5 mb-1 text-accent" />
              <span className="text-xs">Video Call</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-col h-auto py-3 glass border-primary/20 hover:border-primary hover:glow-pink"
            >
              <Gamepad2 className="w-5 h-5 mb-1 text-primary" />
              <span className="text-xs">Play Game</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-col h-auto py-3 glass border-purple-400/20 hover:border-purple-400 hover:glow-purple"
            >
              <Gift className="w-5 h-5 mb-1 text-purple-400" />
              <span className="text-xs">Send NFT</span>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Message input */}
      <motion.div 
        className="p-4 glass-card sticky bottom-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 glass border-white/10 focus:border-accent"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button 
            onClick={handleSendMessage}
            size="sm"
            className="px-4 bg-primary hover:bg-primary/80 glow-pink"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {currentDay >= 7 && (
          <Button 
            onClick={() => onComplete(profile)}
            className="w-full mt-3 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 glow-pink"
          >
            Complete Date & Rate Experience
          </Button>
        )}
      </motion.div>
    </div>
  );
}