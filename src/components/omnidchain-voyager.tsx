'use client';

import { useState } from 'react';
import { NftCard } from './nft-card';
import { ActionPanel } from './action-panel';
import { LogConsole, LogEntry } from './log-console';
import { Header } from './header';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Leaderboard } from './leaderboard';
import { generateQuest } from '@/ai/flows/quest-generator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from './ui/label';

const XP_TO_LEVEL_UP = 100;
const XP_GAIN = 50;
const SOLANA_FEE = '0.0001 SOL';
const ETH_GAS = '0.01 ETH';

const initialImageUrl = 'https://placehold.co/600x400.png';
const upgradedImageUrl = 'https://placehold.co/600x400/9f7aea/white.png';

type NftState = {
  name: string;
  level: number;
  xp: number;
  chain: 'Ethereum' | 'Solana';
  imageUrl: string;
  str: number;
  def: number;
  agi: number;
  skillPoints: number;
};

type QuestSummary = {
  xpGained: number;
  fee: string;
  leveledUp: boolean;
  newLevel: number | null;
};

function formatTimestamp(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function OmniChainVoyager() {
  const [nft, setNft] = useState<NftState>({
    name: '',
    level: 1,
    xp: 0,
    chain: 'Ethereum',
    imageUrl: initialImageUrl,
    str: 1,
    def: 1,
    agi: 1,
    skillPoints: 0,
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isBridging, setIsBridging] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [isNaming, setIsNaming] = useState(true);
  const [inputName, setInputName] = useState('');
  const [showShareButton, setShowShareButton] = useState(false);
  const [justLeveledUp, setJustLeveledUp] = useState(false);
  const [isQuestSummaryOpen, setIsQuestSummaryOpen] = useState(false);
  const [questSummary, setQuestSummary] = useState<QuestSummary | null>(null);
  const [questDescription, setQuestDescription] = useState('Defeat the Gravity Slime on Solana.');
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [giftAddress, setGiftAddress] = useState('');

  const addLog = (message: string) => {
    setLogs(prev => [...prev, { timestamp: formatTimestamp(), message }]);
  };

  const generateNewQuest = async (name: string, level: number) => {
    addLog("Generating new quest...");
    try {
        const newQuest = await generateQuest({ name, level });
        setQuestDescription(newQuest.quest);
        addLog(`✨ New Quest: <span class="text-accent">${newQuest.quest}</span>`);
    } catch (error) {
        console.error('Failed to generate quest:', error);
        addLog('Could not generate a new quest. Using default.');
        setQuestDescription('Defeat the Gravity Slime on Solana.');
    }
  };

  const handleNameSubmit = () => {
    const trimmedName = inputName.trim();
    if (trimmedName) {
      setNft(prev => ({ ...prev, name: trimmedName }));
      setIsNaming(false);
      addLog(`Voyager '${trimmedName}' created. Welcome!`);
    }
  };

  const handleBridge = () => {
    setShowShareButton(false);
    setIsBridging(true);
    addLog('Initiating bridge from Ethereum to Solana...');
    setTimeout(() => {
        addLog(`Estimated Gas: ${ETH_GAS}. Confirming transaction...`);
    }, 1000)
    setTimeout(() => {
      addLog('LayerZero: Verifying transaction...');
    }, 2500);
    setTimeout(() => {
      addLog('✅ Success! Character arrived on Solana. <a href="https://layerzeroscan.com/tx/0x1f2727c1c51888a7861977791461d3311532a8934757c3d25819e91f36a83a04" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80">View on LayerZero Scan</a>');
      setNft(prev => ({ ...prev, chain: 'Solana' }));
      setIsBridging(false);
      generateNewQuest(nft.name, nft.level);
    }, 4000);
  };

  const handleTrain = () => {
    setShowShareButton(false);
    setIsTraining(true);
    addLog(`Quest Started: ${questDescription}...`);
    setTimeout(() => {
      addLog(`Fee: ${SOLANA_FEE}. Engaging in combat...`);
    }, 1000);
    setTimeout(() => {
      let newXp = nft.xp + XP_GAIN;
      let newLevel = nft.level;
      let newImageUrl = nft.imageUrl;
      let leveledUp = false;
      let skillPointsGained = 0;

      if (newXp >= XP_TO_LEVEL_UP) {
        newLevel += 1;
        newXp -= XP_TO_LEVEL_UP;
        newImageUrl = upgradedImageUrl;
        leveledUp = true;
        skillPointsGained = 1;

        setJustLeveledUp(true);
        setTimeout(() => setJustLeveledUp(false), 1500); // Animation duration
      }
      
      addLog(`✅ Quest Complete! Gained ${XP_GAIN} XP.`);
      if (leveledUp) {
        addLog(`🎉 Leveled up to Level ${newLevel}! Character appearance has been upgraded.`);
        addLog(`You have gained 1 Skill Point!`);
        setShowShareButton(true);
      }
      
      setQuestSummary({ xpGained: XP_GAIN, fee: SOLANA_FEE, leveledUp, newLevel: leveledUp ? newLevel : null });
      setIsQuestSummaryOpen(true);

      setNft(prev => ({ 
        ...prev, 
        xp: newXp, 
        level: newLevel, 
        imageUrl: newImageUrl,
        skillPoints: prev.skillPoints + skillPointsGained,
      }));
      setIsTraining(false);
      generateNewQuest(nft.name, newLevel);
    }, 3000);
  };

  const handleReturn = () => {
    setIsReturning(true);
    addLog('Initiating return bridge from Solana to Ethereum...');
    setTimeout(() => {
      addLog(`Fee: ${SOLANA_FEE}. Confirming transaction...`);
    }, 1000);
    setTimeout(() => {
      addLog('LayerZero: Verifying transaction...');
    }, 2500);
    setTimeout(() => {
      addLog('✅ Success! Character returned to Ethereum. <a href="https://layerzeroscan.com/tx/0xcae89321c759e6919e1a1219800115e2e8504938662928509059f1396a858599" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80">View on LayerZero Scan</a>');
      setNft(prev => {
        addLog(`Voyager '${prev.name}' has returned as Level ${prev.level} with updated stats.`);
        return { ...prev, chain: 'Ethereum' };
      });
      setIsReturning(false);
      setShowShareButton(true);
    }, 4000);
  };
  
  const handleSpendSkillPoint = (stat: 'str' | 'def' | 'agi') => {
    if (nft.skillPoints > 0) {
      const statName = { str: 'Strength', def: 'Defense', agi: 'Agility' }[stat];
      addLog(`Skill point spent. ${statName} increased by 1!`);
      setNft(prev => ({
        ...prev,
        [stat]: prev[stat] + 1,
        skillPoints: prev.skillPoints - 1,
      }));
    }
  };

  const handleShare = () => {
    const text = `My Voyager '${nft.name}' is getting stronger on its journey between Ethereum and Solana! This omnichain asset, powered by @LayerZero_Labs and @solana, is the future of gaming. #L0Bounty #SolanaBreakout`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleSendGift = () => {
    if (!giftAddress.trim() || !giftAddress.startsWith('0x')) {
      addLog("⚠️ Please enter a valid address to send a gift.");
      return;
    }
    setIsGiftModalOpen(false);
    addLog(`Initiating gift transfer of 20 XP to <span class="text-primary font-mono">${giftAddress}</span> via LayerZero...`);
    setTimeout(() => {
      addLog(`✅ Gift Sent! <a href="https://layerzeroscan.com/tx/0xfa9999c1c51888a7861977791461d3311532a8934757c3d25819e91f36a83a04" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80">View on LayerZero Scan</a>`);
    }, 2500);
    setGiftAddress('');
  };

  if (isNaming) {
    return (
      <div className="bg-background min-h-screen text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl font-bold text-primary mb-4 animate-pulse">Name Your Voyager</h1>
          <p className="text-gray-400 mb-8">Every great journey starts with a name. Give your character a unique identity.</p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g., Cypher Knight"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
              className="text-lg h-12"
            />
            <Button onClick={handleNameSubmit} disabled={!inputName.trim()} className="text-lg h-12">
              Begin
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen text-white">
      <Header />
      <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <NftCard {...nft} justLeveledUp={justLeveledUp} />
          <div className="space-y-8">
            <ActionPanel
              currentChain={nft.chain}
              isBridging={isBridging}
              isTraining={isTraining}
              isReturning={isReturning}
              skillPoints={nft.skillPoints}
              onBridge={handleBridge}
              onTrain={handleTrain}
              onReturn={handleReturn}
              onSpendSkillPoint={handleSpendSkillPoint}
              showShareButton={showShareButton}
              onShare={handleShare}
              questDescription={questDescription}
              onOpenGiftModal={() => setIsGiftModalOpen(true)}
            />
            <LogConsole logs={logs} />
            <Leaderboard voyagerName={nft.name} voyagerLevel={nft.level} />
          </div>
        </div>
      </main>

      {questSummary && (
        <AlertDialog open={isQuestSummaryOpen} onOpenChange={setIsQuestSummaryOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {questSummary.leveledUp ? `🎉 Level Up! Welcome to Level ${questSummary.newLevel}!` : "Quest Complete!"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                You defeated the Gravity Slime. Here's your summary.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-2 text-sm my-4">
              <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">XP Gained</span>
                  <span className="font-bold text-accent">+{questSummary.xpGained} XP</span>
              </div>
              <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Transaction Fee</span>
                  <span className="font-mono text-xs">{questSummary.fee}</span>
              </div>
              {questSummary.leveledUp && (
                  <div className="flex justify-between items-center border-t border-primary/20 pt-2 mt-2">
                      <span className="text-muted-foreground">New Reward</span>
                      <span className="font-bold text-primary">+1 Skill Point</span>
                  </div>
              )}
            </div>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setIsQuestSummaryOpen(false)}>
                Awesome!
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <Dialog open={isGiftModalOpen} onOpenChange={setIsGiftModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Send Gift</DialogTitle>
            <DialogDescription>
                Send a gift of 20 XP to another Voyager. This action will be broadcasted on LayerZero.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                Address
                </Label>
                <Input
                id="address"
                placeholder="0x..."
                value={giftAddress}
                onChange={(e) => setGiftAddress(e.target.value)}
                className="col-span-3"
                />
            </div>
            </div>
            <DialogFooter>
            <Button type="submit" onClick={handleSendGift}>Send Gift</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
