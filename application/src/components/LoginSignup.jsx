import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Heart, Wallet } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export function LoginSignup({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      fullname: '',
      username: '',
      email: '',
      password: '',
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setError('');
    const endpoint = isLogin ? '/login' : '/register';
    try {
      const { email, password, fullname, username } = formData;
      const payload = isLogin ? { email, password } : { fullname, username, email, password };

      if (!email || !password || (!isLogin && (!fullname || !username))) {
        setError('Please fill in all fields.');
        return;
      }
      
      const response = await axios.post(`${API_URL}${endpoint}`, payload);

      if (response.data.token) {
        console.log('Authentication successful:', response.data.message);
        // *** THE FIX IS HERE ***
        // Pass the token received from the server to the onLogin function
        onLogin(response.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 pointer-events-none" />

      <motion.div
        className="flex-1 flex flex-col items-center justify-center space-y-8 z-10 w-full max-w-sm"
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
            <h1 className="gradient-text-pink-blue text-4xl font-bold">Winkly</h1>
          </motion.div>

          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {isLogin ? 'Welcome back!' : 'Join the community.'}
          </motion.p>
        </div>

        {/* Form Section */}
        <motion.div
          className="w-full space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {!isLogin && (
            <>
              <Input
                name='fullname'
                type="text"
                placeholder="Full Name"
                className="w-full glass-card border-white/10 focus:border-accent"
                value={formData.fullname}
                onChange={handleChange}
              />
              <Input
                name='username'
                type="text"
                placeholder="Username"
                className="w-full glass-card border-white/10 focus:border-accent"
                value={formData.username}
                onChange={handleChange}
              />
            </>
          )}
          <Input
            name='email'
            type="email"
            placeholder="Email"
            className="w-full glass-card border-white/10 focus:border-accent"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            name='password'
            type="password"
            placeholder="Password"
            className="w-full glass-card border-white/10 focus:border-accent"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button
            onClick={handleSubmit}
            className="w-full glass-card glow-pink hover:glow-pink/80 transition-all duration-300 py-6"
            size="lg"
          >
            <Heart className="w-5 h-5 mr-2" />
            {isLogin ? 'Login with Email' : 'Sign Up with Email'}
          </Button>
        </motion.div>

        <p className="text-muted-foreground">or</p>

        <Button
            onClick={() => alert("Wallet connection not implemented yet.")}
            variant="outline"
            className="w-full glass border-accent/30 hover:border-accent hover:bg-accent/10 hover:glow-blue transition-all duration-300 py-6"
            size="lg"
          >
            <Wallet className="w-5 h-5 mr-2" />
            Connect Wallet
          </Button>

        <p className="text-sm text-muted-foreground">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={toggleForm} className="text-primary hover:underline">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
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