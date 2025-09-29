import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Diamond, TrendingUp, Download, Plus, Heart, ArrowRight, Wallet } from 'lucide-react';

interface DashboardScreenProps {
  onBack: () => void;
}

export function DashboardScreen({ onBack }: DashboardScreenProps) {
  const nftBalance = 47;
  const totalEarned = 125;
  const successfulDates = 15;
  
  const transactions = [
    {
      id: '1',
      type: 'earned',
      amount: 5,
      description: 'Completed 7-day date with Sarah',
      date: '2 hours ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'bought',
      amount: -3,
      description: 'NFT Date purchase for Alex',
      date: '1 day ago',
      status: 'active'
    },
    {
      id: '3',
      type: 'earned',
      amount: 8,
      description: 'Completed 7-day date with Maya',
      date: '3 days ago',
      status: 'completed'
    },
    {
      id: '4',
      type: 'refund',
      amount: 3,
      description: 'NFT refund from James',
      date: '5 days ago',
      status: 'completed'
    },
    {
      id: '5',
      type: 'bought',
      amount: -3,
      description: 'NFT Date purchase for Emma',
      date: '1 week ago',
      status: 'completed'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earned':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'bought':
        return <Heart className="w-4 h-4 text-primary" />;
      case 'refund':
        return <ArrowRight className="w-4 h-4 text-blue-400" />;
      default:
        return <Diamond className="w-4 h-4 text-accent" />;
    }
  };

  const getTransactionColor = (type: string, amount: number) => {
    if (amount > 0) return 'text-green-400';
    if (type === 'bought') return 'text-primary';
    return 'text-muted-foreground';
  };

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
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Button>
        <h1 className="font-semibold gradient-text-pink-blue">NFT Wallet</h1>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-white/10"
        >
          <Wallet className="w-5 h-5" />
        </Button>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Balance card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-accent/20 glow-blue">
            <CardHeader className="text-center pb-2">
              <motion.div
                className="w-16 h-16 mx-auto glass-card rounded-full flex items-center justify-center glow-blue mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Diamond className="w-8 h-8 text-accent" />
              </motion.div>
              <CardTitle className="gradient-text-pink-blue text-3xl">
                {nftBalance}
              </CardTitle>
              <p className="text-muted-foreground">NFT Balance</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-400">{totalEarned}</p>
                  <p className="text-xs text-muted-foreground">Total Earned</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{successfulDates}</p>
                  <p className="text-xs text-muted-foreground">Successful Dates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button 
            className="flex-col h-auto py-4 glass-card border-accent/20 hover:border-accent hover:glow-blue"
            variant="outline"
          >
            <Download className="w-5 h-5 mb-2 text-accent" />
            <span className="text-xs">Withdraw</span>
          </Button>
          
          <Button 
            className="flex-col h-auto py-4 glass-card border-primary/20 hover:border-primary hover:glow-pink"
            variant="outline"
          >
            <Plus className="w-5 h-5 mb-2 text-primary" />
            <span className="text-xs">Buy NFTs</span>
          </Button>
          
          <Button 
            className="flex-col h-auto py-4 glass-card border-purple-400/20 hover:border-purple-400 hover:glow-purple"
            variant="outline"
          >
            <Heart className="w-5 h-5 mb-2 text-purple-400" />
            <span className="text-xs">Explore</span>
          </Button>
        </motion.div>

        {/* Performance chart placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>NFT Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-center justify-center glass-card rounded-lg border border-accent/10">
                <div className="text-center space-y-2">
                  <TrendingUp className="w-8 h-8 text-accent mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Earning +15% more NFTs than average user
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transaction history */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 glass-card rounded-lg border border-white/5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 glass-card rounded-full flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{transaction.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {transaction.date}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            transaction.status === 'active' 
                              ? 'border-accent/30 text-accent' 
                              : 'border-green-400/30 text-green-400'
                          }`}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${getTransactionColor(transaction.type, transaction.amount)}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">NFT</p>
                  </div>
                </motion.div>
              ))}
              
              <Button 
                variant="ghost" 
                className="w-full mt-4 hover:bg-white/5"
              >
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats summary */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold gradient-text-purple-pink mb-1">
                4.8
              </div>
              <p className="text-xs text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold gradient-text-pink-blue mb-1">
                92%
              </div>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}