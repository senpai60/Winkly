import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Bell, 
  Shield, 
  Heart, 
  MapPin, 
  Filter, 
  Wallet, 
  Moon, 
  Volume2,
  Vibrate,
  Eye,
  Lock,
  AlertTriangle,
  HelpCircle,
  LogOut
} from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [settings, setSettings] = useState({
    notifications: {
      matches: true,
      messages: true,
      nftUpdates: true,
      dateReminders: true,
      sound: true,
      vibration: false
    },
    privacy: {
      showOnline: true,
      showDistance: true,
      showNFTBalance: false,
      incognito: false
    },
    discovery: {
      showMe: true,
      ageRange: [22, 35],
      maxDistance: 50,
      showRecentlyActive: true
    },
    blockchain: {
      autoWithdraw: false,
      withdrawThreshold: 10,
      showTransactions: true
    }
  });

  const handleToggle = (category: keyof typeof settings, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting as keyof typeof prev[typeof category]]
      }
    }));
  };

  const handleSliderChange = (category: keyof typeof settings, setting: string, value: number | number[]) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: Array.isArray(value) ? value : value
      }
    }));
  };

  const settingSections = [
    {
      title: 'Notifications',
      settingsKey: 'notifications' as keyof typeof settings,
      icon: Bell,
      items: [
        { key: 'matches', label: 'New Matches', description: 'Get notified when someone likes you back' },
        { key: 'messages', label: 'Messages', description: 'Chat notifications during NFT dates' },
        { key: 'nftUpdates', label: 'NFT Updates', description: 'Transaction confirmations and rewards' },
        { key: 'dateReminders', label: 'Date Reminders', description: 'Reminders for ongoing NFT dates' },
        { key: 'sound', label: 'Sound', description: 'Play notification sounds' },
        { key: 'vibration', label: 'Vibration', description: 'Vibrate for notifications' }
      ]
    },
    {
      title: 'Privacy & Safety',
      settingsKey: 'privacy' as keyof typeof settings,
      icon: Shield,
      items: [
        { key: 'showOnline', label: 'Show Online Status', description: 'Let others see when you\'re active' },
        { key: 'showDistance', label: 'Show Distance', description: 'Display your approximate distance' },
        { key: 'showNFTBalance', label: 'Show NFT Balance', description: 'Display your NFT count publicly' },
        { key: 'incognito', label: 'Incognito Mode', description: 'Browse profiles without being seen' }
      ]
    },
    {
      title: 'Discovery Settings',
      settingsKey: 'discovery' as keyof typeof settings,
      icon: Filter,
      items: [
        { key: 'showMe', label: 'Show Me in Discovery', description: 'Appear in other users\' swipe deck' },
        { key: 'showRecentlyActive', label: 'Recently Active Only', description: 'Only show recently active users' }
      ]
    },
    {
      title: 'Blockchain & NFTs',
      settingsKey: 'blockchain' as keyof typeof settings,
      icon: Wallet,
      items: [
        { key: 'autoWithdraw', label: 'Auto Withdraw', description: 'Automatically withdraw NFTs when threshold is reached' },
        { key: 'showTransactions', label: 'Show Transaction History', description: 'Display NFT transactions in profile' }
      ]
    }
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
        <h1 className="font-semibold gradient-text-pink-blue">Settings</h1>
        <div className="w-9" /> {/* Spacer */}
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Account info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Account Status</h3>
                  <p className="text-sm text-muted-foreground">Premium NFT Member</p>
                </div>
                <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                  ✨ Premium
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings sections */}
        {settingSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + sectionIndex * 0.1 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <section.icon className="w-5 h-5 text-accent" />
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={item.key}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                      <Switch
                        checked={settings[section.settingsKey][item.key as keyof typeof settings[typeof section.settingsKey]]}
                        onCheckedChange={() => handleToggle(section.settingsKey, item.key)}
                      />
                    </div>
                    {itemIndex < section.items.length - 1 && (
                      <Separator className="mt-4 bg-white/10" />
                    )}
                  </div>
                ))}
                
                {/* Special cases for sliders */}
                {section.title === 'Discovery Settings' && (
                  <>
                    <Separator className="bg-white/10" />
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Age Range</span>
                          <span className="text-sm text-muted-foreground">
                            {settings.discovery.ageRange[0]} - {settings.discovery.ageRange[1]}
                          </span>
                        </div>
                        <Slider
                          value={settings.discovery.ageRange}
                          onValueChange={(value) => handleSliderChange('discovery', 'ageRange', value)}
                          min={18}
                          max={65}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Max Distance</span>
                          <span className="text-sm text-muted-foreground">
                            {settings.discovery.maxDistance} km
                          </span>
                        </div>
                        <Slider
                          value={[settings.discovery.maxDistance]}
                          onValueChange={(value) => handleSliderChange('discovery', 'maxDistance', value[0])}
                          min={1}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </>
                )}
                
                {section.title === 'Blockchain & NFTs' && (
                  <>
                    <Separator className="bg-white/10" />
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Auto Withdraw Threshold</span>
                        <span className="text-sm text-muted-foreground">
                          {settings.blockchain.withdrawThreshold} NFTs
                        </span>
                      </div>
                      <Slider
                        value={[settings.blockchain.withdrawThreshold]}
                        onValueChange={(value) => handleSliderChange('blockchain', 'withdrawThreshold', value[0])}
                        min={5}
                        max={50}
                        step={5}
                        className="w-full"
                        disabled={!settings.blockchain.autoWithdraw}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Support & Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-accent" />
                <span>Support & Info</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-white/5"
              >
                <HelpCircle className="w-4 h-4 mr-3" />
                Help Center
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-white/5"
              >
                <Shield className="w-4 h-4 mr-3" />
                Privacy Policy
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-white/5"
              >
                <AlertTriangle className="w-4 h-4 mr-3" />
                Report Issues
              </Button>
              
              <Separator className="bg-white/10" />
              
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-red-500/10 text-red-400"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* App info */}
        <motion.div
          className="text-center text-muted-foreground text-sm py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>NFTLove v1.0.0</p>
          <p className="mt-1">Made with ❤️ for Web3 dating</p>
        </motion.div>
      </div>
    </div>
  );
}