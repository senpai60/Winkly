import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Heart, Wallet, Mail, Lock } from 'lucide-react';

interface AuthScreenProps {
  onLogin: () => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Logging in with:', { email, password });
    } else {
      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      console.log('Signing up with:', { email, password });
    }
    // This will take you to the main app after submitting the form.
    // Later, we'll connect this to a real server.
    onLogin();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 pointer-events-none" />

      <motion.div
        className="flex-1 flex flex-col items-center justify-center space-y-6 z-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center space-y-3">
          <motion.div
            className="flex items-center justify-center space-x-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Heart className="w-8 h-8 text-primary" />
            <h1 className="gradient-text-pink-blue text-4xl font-bold">Winkly</h1>
          </motion.div>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {isLogin ? 'Welcome back!' : 'Create an account to get started'}
          </motion.p>
        </div>

        <Card className="w-full glass-card border-white/10">
          <CardHeader>
            <CardTitle className="gradient-text-purple-pink text-center text-2xl">
              {isLogin ? 'Login' : 'Sign Up'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-10 glass border-white/10 focus:border-accent"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-10 glass border-white/10 focus:border-accent"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isLogin && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="pl-10 glass border-white/10 focus:border-accent"
                    value={confirmPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/80 glow-pink py-6 text-base font-semibold">
                {isLogin ? 'Login' : 'Create Account'}
              </Button>
            </form>

            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
            </div>

            <Button
                onClick={onLogin}
                variant="outline"
                className="w-full glass border-accent/30 hover:border-accent hover:bg-accent/10 hover:glow-blue transition-all duration-300 py-6"
            >
                <Wallet className="w-5 h-5 mr-2" />
                Connect Wallet
            </Button>
            
          </CardContent>
        </Card>

        <p className="text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <Button variant="link" className="pl-2 text-accent" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </Button>
        </p>
      </motion.div>
    </div>
  );
}

