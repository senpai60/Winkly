import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Heart, Wallet } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-6">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 pointer-events-none" />
      
      <motion.div 
        className="flex-1 flex flex-col items-center justify-center space-y-8 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo & Tagline */}
        <div className="text-center space-y-4">
          <motion.div
            className="flex items-center justify-center space-x-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Heart className="w-8 h-8 text-primary" />
            <h1 className="gradient-text-pink-blue text-4xl font-bold">NFTLove</h1>
          </motion.div>
          
          <motion.p 
            className="text-muted-foreground text-lg max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Where authentic connections meet digital value
          </motion.p>
        </div>

        {/* Login buttons */}
        <motion.div 
          className="w-full max-w-sm space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button 
            onClick={onLogin}
            className="w-full glass-card glow-pink hover:glow-pink/80 transition-all duration-300 py-6"
            size="lg"
          >
            <Heart className="w-5 h-5 mr-2" />
            Login with Email
          </Button>
          
          <Button 
            onClick={onLogin}
            variant="outline"
            className="w-full glass border-accent/30 hover:border-accent hover:bg-accent/10 hover:glow-blue transition-all duration-300 py-6"
            size="lg"
          >
            <Wallet className="w-5 h-5 mr-2" />
            Connect Wallet
          </Button>
        </motion.div>

        {/* Features preview */}
        <motion.div 
          className="grid grid-cols-3 gap-4 max-w-sm w-full mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto glass-card rounded-full flex items-center justify-center glow-pink">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Authentic Dates</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto glass-card rounded-full flex items-center justify-center glow-blue">
              <span className="text-accent font-bold">NFT</span>
            </div>
            <p className="text-xs text-muted-foreground">Earn Rewards</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto glass-card rounded-full flex items-center justify-center glow-purple">
              <span className="text-purple-400">✨</span>
            </div>
            <p className="text-xs text-muted-foreground">Build Trust</p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Footer */}
      <motion.p 
        className="text-xs text-muted-foreground text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        By continuing, you agree to our Terms & Privacy Policy
      </motion.p>
    </div>
  );
}