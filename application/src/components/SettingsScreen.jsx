import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, Bell, Shield, Filter, Wallet, HelpCircle, LogOut 
} from 'lucide-react';

export function SettingsScreen({ onBack }) {
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

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleSliderChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const settingSections = [
    { title: 'Notifications', settingsKey: 'notifications', icon: Bell, items: [
        { key: 'matches', label: 'New Matches', description: 'Get notified when someone likes you back' },
        { key: 'messages', label: 'Messages', description: 'Chat notifications during NFT dates' },
    ]},
    { title: 'Privacy & Safety', settingsKey: 'privacy', icon: Shield, items: [
        { key: 'showOnline', label: 'Show Online Status', description: 'Let others see when you\'re active' },
        { key: 'showDistance', label: 'Show Distance', description: 'Display your approximate distance' },
    ]},
    { title: 'Discovery Settings', settingsKey: 'discovery', icon: Filter, items: [
        { key: 'showMe', label: 'Show Me in Discovery', description: 'Appear in other users\' swipe deck' },
        { key: 'showRecentlyActive', label: 'Recently Active Only', description: 'Only show recently active users' }
    ]},
    { title: 'Blockchain & NFTs', settingsKey: 'blockchain', icon: Wallet, items: [
        { key: 'autoWithdraw', label: 'Auto Withdraw', description: 'Automatically withdraw NFTs when threshold is reached' },
        { key: 'showTransactions', label: 'Show Transaction History', description: 'Display NFT transactions in profile' }
    ]}
  ];

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
        <h1 className="font-semibold gradient-text-pink-blue">Settings</h1>
        <div className="w-9" />
      </motion.div>

      <div className="p-4 space-y-6">
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
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                      <Switch
                        checked={settings[section.settingsKey][item.key]}
                        onCheckedChange={() => handleToggle(section.settingsKey, item.key)}
                      />
                    </div>
                    {itemIndex < section.items.length - 1 && (<Separator className="mt-4 bg-white/10" />)}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Support & Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-accent" />
                <span>Support & Info</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start hover:bg-white/5">
                <HelpCircle className="w-4 h-4 mr-3" />
                Help Center
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-white/5 text-red-400">
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}