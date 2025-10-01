import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Heart, Wallet } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const API_URL = `${API_BASE_URL}/api/users`;

export function LoginSignup({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    dob: '', // Date of Birth state
    gender: '', // Gender state
    interestedIn: [], // Sexuality/Preference state
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
      dob: '',
      gender: '',
      interestedIn: [],
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
        const interests = prev.interestedIn;
        if (checked) {
            return { ...prev, interestedIn: [...interests, value] };
        } else {
            return { ...prev, interestedIn: interests.filter(interest => interest !== value) };
        }
    });
  };

  const handleSubmit = async () => {
    setError('');
    const endpoint = isLogin ? '/login' : '/register';
    try {
      if (isLogin) {
        // Login Logic
        const { email, password } = formData;
        if (!email || !password) return setError('Please fill in all fields.');
        const response = await axios.post(`${API_URL}${endpoint}`, { email, password });
        if (response.data.token) {
          onLogin(response.data.token);
        }
      } else {
        // Register Logic
        if (!formData.fullname || !formData.username || !formData.email || !formData.password || !formData.dob || !formData.gender || formData.interestedIn.length === 0) {
          return setError('Please fill in all fields.');
        }
        const response = await axios.post(`${API_URL}${endpoint}`, formData);
        if (response.data.token) {
          console.log('Registration successful:', response.data.message);
          onLogin(response.data.token);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const genderOptions = ["Male", "Female", "Non-binary", "Transgender", "Other", "Prefer not to say"];
  const interestOptions = ["Male", "Female", "Non-binary", "Transgender", "Other"];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 pointer-events-none" />
      <motion.div
        className="flex-1 flex flex-col items-center justify-center space-y-6 z-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
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
        <motion.div
          className="w-full space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {!isLogin && (
            <>
              <Input name='fullname' type="text" placeholder="Full Name" value={formData.fullname} onChange={handleChange} className="w-full glass-card border-white/10 focus:border-accent" />
              <Input name='username' type="text" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full glass-card border-white/10 focus:border-accent" />
            </>
          )}
          <Input name='email' type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full glass-card border-white/10 focus:border-accent" />
          <Input name='password' type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full glass-card border-white/10 focus:border-accent" />
          
          {!isLogin && (
            <>
              {/* --- Date of Birth Input --- */}
              <div className='text-left'>
                <label className="text-sm text-muted-foreground ml-1">Date of Birth</label>
                <Input name='dob' type="date" value={formData.dob} onChange={handleChange} className="w-full glass-card border-white/10 focus:border-accent" />
              </div>
              
              {/* --- Gender Selection --- */}
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-11 px-3 py-1 text-sm bg-transparent glass-card border border-white/10 rounded-md focus:border-accent outline-none">
                <option value="" disabled>Select your gender</option>
                {genderOptions.map(option => <option key={option} value={option} className="bg-gray-800 text-white">{option}</option>)}
              </select>

              {/* --- Interested In --- */}
              <div className='text-left text-muted-foreground'>
                <label className="text-sm ml-1">Interested In</label>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    {interestOptions.map(option => (
                        <label key={option} className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" value={option} onChange={handleInterestChange} className="form-checkbox h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"/>
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
              </div>
            </>
          )}
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button onClick={handleSubmit} className="w-full glass-card glow-pink hover:glow-pink/80 transition-all duration-300 py-6" size="lg">
            <Heart className="w-5 h-5 mr-2" />
            {isLogin ? 'Login with Email' : 'Sign Up with Email'}
          </Button>
        </motion.div>
        
        <p className="text-sm text-muted-foreground">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={toggleForm} className="text-primary hover:underline">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}